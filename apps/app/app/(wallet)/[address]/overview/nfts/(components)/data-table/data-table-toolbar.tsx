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

"use client";

import { Button } from "@lightdotso/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import type { Address } from "viem";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import type { NftData, NftDataPage, WalletSettingsData } from "@/data";
import { queries } from "@/queries";
import { useAuth, useTables } from "@/stores";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface DataTableToolbarProps {
  table: Table<NftData>;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();
  const { nftColumnFilters } = useTables();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const walletSettings: WalletSettingsData | undefined =
    queryClient.getQueryData(
      queries.wallet.settings({ address: wallet as Address }).queryKey,
    );

  const currentData: NftDataPage | undefined = queryClient.getQueryData(
    queries.nft.list({
      address: wallet as Address,
      is_testnet: walletSettings?.is_enabled_testnet,
    }).queryKey,
  );

  // ---------------------------------------------------------------------------
  // Hook
  // ---------------------------------------------------------------------------

  const uniqueChainValues = useMemo(() => {
    // Get all unique weight values from current data
    const uniqueChainValues = new Set<string>();
    currentData?.nfts.forEach(nft => {
      uniqueChainValues.add(nft.chain!);
    });
    return uniqueChainValues;
  }, [currentData]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <div className="flex flex-1 items-center space-x-2">
        {table && table.getColumn("chain") && (
          <DataTableFacetedFilter
            column={table.getColumn("chain")}
            title="Chain"
            options={Array.from(uniqueChainValues).map(chain => ({
              value: chain,
              label: chain,
            }))}
          />
        )}
        {table && table.getColumn("spam_score") && (
          <DataTableFacetedFilter
            column={table.getColumn("spam_score")}
            title="Spam"
            options={["Yes", "No"].map(value => ({
              value: value === "No" ? "0" : "70",
              label: value,
            }))}
          />
        )}
        {nftColumnFilters.length > 0 && (
          <Button
            variant="outline"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        columnMapping={{
          chain: "Chain",
          name: "Name",
          description: "Description",
          spam_score: "Spam Score",
        }}
      />
    </>
  );
}
