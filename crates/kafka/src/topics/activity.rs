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

use crate::{
    namespace::ACTIVITY, produce_message, traits::ToJson, types::activity::ActivityMessage,
};
use eyre::Result;
use lightdotso_prisma::ActivityEntity;
pub use rdkafka;
use rdkafka::producer::FutureProducer;
use std::sync::Arc;

// Produce a message with Activity topic.
pub async fn produce_activity_message(
    producer: Arc<FutureProducer>,
    key: ActivityEntity,
    msg: &ActivityMessage,
) -> Result<()> {
    let message = msg.to_json();

    produce_message(producer, ACTIVITY.as_str(), &message, Some(&key.to_string())).await?;
    Ok(())
}
