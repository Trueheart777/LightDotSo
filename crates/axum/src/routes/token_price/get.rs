// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

use super::types::{TokenPrice, TokenPriceDate};
use crate::{
    result::{AppError, AppJsonResult},
    state::AppState,
};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use ethers_main::{types::H160, utils::to_checksum};
use lightdotso_prisma::token;
use lightdotso_tracing::tracing::info;
use prisma_client_rust::{raw, PrismaValue};
use serde::Deserialize;
use utoipa::IntoParams;

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct GetQuery {
    /// The address of the token_price.
    pub address: String,
    /// The chain id of the token_price.
    pub chain_id: i64,
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

#[derive(Clone, Debug, Deserialize)]
struct TokenPriceQueryReturnType {
    date: prisma_client_rust::chrono::DateTime<::prisma_client_rust::chrono::FixedOffset>,
    price: f64,
}

/// Implement FromTokenPriceQueryReturnType> for Token.
impl From<TokenPriceQueryReturnType> for TokenPriceDate {
    fn from(token_price_query: TokenPriceQueryReturnType) -> Self {
        Self { price: token_price_query.price, date: token_price_query.date.to_rfc3339() }
    }
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Get a token_price
#[utoipa::path(
        get,
        path = "/token_price/get",
        params(
            GetQuery
        ),
        responses(
            (status = 200, description = "Token returned successfully", body = TokenPrice),
            (status = 404, description = "Token not found", body = TokenError),
        )
    )]
#[autometrics]
pub(crate) async fn v1_token_price_get_handler(
    get_query: Query<GetQuery>,
    State(state): State<AppState>,
) -> AppJsonResult<TokenPrice> {
    // Get the get query.
    let Query(query) = get_query;

    info!("Get token for address: {:?}", query);
    let parsed_query_address: H160 = query.address.parse()?;
    let checksum_address = to_checksum(&parsed_query_address, None);

    // Get the tokens from the database.
    let token = state
        .client
        .token()
        .find_unique(token::address_chain_id(checksum_address, query.chain_id))
        .exec()
        .await?;

    // If the token is not found, return a 404.
    let token = token.ok_or(AppError::NotFound)?;

    // Get the tokens from the database.
    let result: Vec<TokenPriceQueryReturnType> = state
        .client
        ._query_raw(raw!(
            "SELECT AVG(price) as price, DATE(timestamp) as date
            FROM TokenPrice
            WHERE tokenId = {}
            GROUP BY DATE(timestamp)
            ORDER BY DATE(timestamp) DESC",
            PrismaValue::String(token.id)
        ))
        .exec()
        .await?;
    info!("result: {:?}", result);

    // Get the price from the result array.
    let price = if !result.is_empty() { result[0].price } else { 0.0 };

    // Get the 24h price change from the result array.
    let price_change_24h = if result.len() > 1 { result[0].price - result[1].price } else { 0.0 };

    // Calculate 24h price change percentage
    let price_change_24h_percentage = if result.len() > 1 && result[1].price != 0.0 {
        (price_change_24h / result[1].price) * 100.0
    } else {
        0.0
    };

    // Construct the token_price.
    let token_price = TokenPrice {
        price,
        price_change_24h,
        price_change_24h_percentage,
        prices: result.into_iter().map(|x| x.into()).collect(),
    };

    Ok(Json::from(token_price))
}
