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

use lazy_static::lazy_static;

lazy_static! {
    pub static ref KAKI_USER_ID: &'static str = "clnmo4k820000og9agq9kto92";
}

lazy_static! {
    pub static ref NONCE_KEY: &'static str = "nonce";
}

lazy_static! {
    pub static ref EXPIRATION_TIME_KEY: &'static str = "expirationTime";
}

lazy_static! {
    pub static ref USER_ID_KEY: &'static str = "userId";
}

lazy_static! {
    pub static ref SESSION_COOKIE_ID: &'static str = "lightdotso.sid";
}

lazy_static! {
    pub static ref WALLET_COOKIE_ID: &'static str = "lightdotso.wallet";
}

lazy_static! {
    pub static ref USER_COOKIE_ID: &'static str = "lightdotso.user";
}
