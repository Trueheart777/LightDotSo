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

use crate::polling::Polling;
use clap::Parser;
use eyre::{eyre, Result};
use lightdotso_graphql::constants::{
    SATSUMA_BASE_URL, SATSUMA_LIVE_IDS, THE_GRAPH_HOSTED_SERVICE_URLS,
};
use lightdotso_tracing::tracing::{error, info};

#[derive(Debug, Clone, Parser, Default)]
pub struct PollingArgs {
    /// The flag of whether polling is live.
    #[arg(long, short, default_value_t = true)]
    #[clap(long, env = "POLLING_LIVE")]
    pub live: bool,
    /// The polling mode to connect to.
    #[arg(long, short, default_value_t = String::from(""))]
    #[clap(long, env = "POLLING_MODE")]
    pub mode: String,
    /// The infura API key
    #[clap(long, env = "SATSUMA_API_KEY")]
    pub satsuma_api_key: Option<String>,
    /// The flag of whether polling is live.
    #[arg(long, short, default_value_t = false)]
    #[clap(long, env = "SATSUMA_ENABLED")]
    pub satsuma_enabled: bool,
}

impl PollingArgs {
    #[tokio::main]
    pub async fn run(&self) -> Result<()> {
        // Add info
        info!("PollingArgs run, starting...");

        // Print the config
        info!("Config: {:?}", self);

        // Make a new hash map w/ u64 keys and String values
        let mut chain_id_to_urls = std::collections::HashMap::new();

        // Iterate and push from the `THE_GRAPH_HOSTED_SERVICE_URLS` into the hash map
        for (chain_id, url) in THE_GRAPH_HOSTED_SERVICE_URLS.clone().into_iter() {
            chain_id_to_urls.insert(chain_id, url);
        }

        // Iterate and push from the `SATSUMA_LIVE_IDS` into the hash map
        // If the satsuma_api_key is not None and satsuma_enabled is true
        if self.satsuma_api_key.is_some() && self.satsuma_enabled {
            for (chain_id, id) in SATSUMA_LIVE_IDS.clone().into_iter() {
                let url = format!(
                    "{}/{}/{}",
                    SATSUMA_BASE_URL.clone(),
                    self.satsuma_api_key.clone().ok_or_else(|| eyre!("satsuma_api_key is None"))?,
                    id
                );
                info!("url: {}", url);
                chain_id_to_urls.insert(chain_id, url);
            }
        }

        // Create a vector to store the handles to the spawned tasks.
        let mut handles = Vec::new();

        // Spawn a task for each chain id.
        for (chain_id, url) in chain_id_to_urls.clone().into_iter() {
            if self.live || self.mode == "all" {
                let live_handle =
                    tokio::spawn(run_polling(self.clone(), chain_id, url.clone(), true));
                handles.push(live_handle);
            }

            if !self.live || self.mode == "all" {
                let past_handle =
                    tokio::spawn(run_polling(self.clone(), chain_id, url.clone(), false));
                handles.push(past_handle);
            }
        }

        // Wait for all tasks to finish.
        for handle in handles {
            if let Err(e) = handle.await {
                error!("A task panicked: {:?}", e);
            }
        }

        Ok(())
    }
}

// Run the polling for a specific chain id.
pub async fn run_polling(args: PollingArgs, chain_id: u64, url: String, live: bool) {
    match live {
        true => {
            let polling = Polling::new(&args, chain_id, url.clone(), live).await;
            polling.run().await;
        }
        false => {
            loop {
                let polling = Polling::new(&args, chain_id, url.clone(), live).await;
                polling.run().await;

                // Sleep for 1 hour
                tokio::time::sleep(tokio::time::Duration::from_secs(60 * 60)).await;
            }
        }
    }
}
