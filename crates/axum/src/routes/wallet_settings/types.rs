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

use lightdotso_prisma::wallet_settings;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/// WalletSettings root type.
#[derive(Serialize, Deserialize, ToSchema, Clone)]
#[serde(rename_all = "snake_case")]
pub(crate) struct WalletSettings {
    /// The wallet_settings of whether the testnet is enabled.
    pub is_enabled_testnet: bool,
}

/// Optional WalletSettings root type.
#[derive(Serialize, Deserialize, ToSchema, Clone)]
#[serde(rename_all = "snake_case")]
pub(crate) struct WalletSettingsOptional {
    /// The update query of wallet_settings of whether the testnet is enabled.
    pub is_enabled_testnet: Option<bool>,
}

/// Implement From<wallet_settings::Data> for WalletSettings.
impl From<wallet_settings::Data> for WalletSettings {
    fn from(wallet_settings: wallet_settings::Data) -> Self {
        Self { is_enabled_testnet: wallet_settings.is_enabled_testnet }
    }
}
