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

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export type NftData = {
  status: "minted" | "burned";
  nft_id: string | null;
  chain: string | null;
  contract_address: string | null;
  token_id: string | null;
  previews: {
    image_small_url?: string | null | undefined;
    image_medium_url?: string | null | undefined;
    image_large_url?: string | null | undefined;
    image_opengraph_url?: string | null | undefined;
    blurhash?: string | null | undefined;
  };
  owners: {
    owner_address: string | null;
    first_acquired_date: string | null;
    last_acquired_date: string | null;
    nft_id?: string | null | undefined;
    quantity?: number | null | undefined;
  }[];
  contract: {
    symbol: string | null;
    type: string | null;
    name: string | null;
  };
  collection: {
    name: string | null;
    description: string | null;
    collection_id: string | null;
    marketplace_pages: {
      marketplace_name: string | null;
      marketplace_collection_id: string | null;
      collection_url: string | null;
      verified: boolean | null;
    }[];
    floor_prices: {
      payment_token: {
        symbol: string | null;
        name: string | null;
        payment_token_id: string | null;
        address?: string | null | undefined;
        decimals?: number | null | undefined;
      };
      marketplace_id: string | null;
      value?: number | null | undefined;
    }[];
    image_url?: string | null | undefined;
    banner_image_url?: string | null | undefined;
    external_url?: string | null | undefined;
    twitter_username?: string | null | undefined;
    discord_url?: string | null | undefined;
    metaplex_mint?: string | null | undefined;
    metaplex_first_verified_creator?: string | null | undefined;
    spam_score?: number | null | undefined;
  };
  name?: string | null | undefined;
  description?: string | null | undefined;
  image_url?: string | null | undefined;
  video_url?: string | null | undefined;
  audio_url?: string | null | undefined;
  model_url?: string | null | undefined;
  background_color?: string | null | undefined;
  external_url?: string | null | undefined;
  created_date?: string | Date | null | undefined;
  token_count?: number | null | undefined;
  owner_count?: number | null | undefined;
  last_sale?:
    | {
        timestamp: string | null;
        transaction: string | null;
        marketplace_name: string | null;
        is_bundle_sale: boolean | null;
        payment_token: {
          symbol: string | null;
          name: string | null;
          payment_token_id: string | null;
          address?: string | null | undefined;
          decimals?: number | null | undefined;
        };
        from_address?: string | null | undefined;
        to_address?: string | null | undefined;
        quantity?: number | null | undefined;
        unit_price?: number | null | undefined;
        total_price?: number | null | undefined;
      }
    | null
    | undefined;
  extra_metadata?:
    | (Record<string, any> & {
        image_original_url?: string | null | undefined;
        animation_original_url?: string | null | undefined;
        attributes?:
          | {
              value: string | number | null;
              trait_type: string | null;
            }[]
          | null
          | undefined;
      })
    | null
    | undefined;
  queried_wallet_balances?:
    | {
        first_acquired_date: string | null;
        last_acquired_date: string | null;
        address: string | null;
        quantity?: number | null | undefined;
      }[]
    | null
    | undefined;
};

export type NftDataPage = {
  next_cursor: string | null;
  next: string | null;
  nfts: NftData[];
  previous?: any;
};
