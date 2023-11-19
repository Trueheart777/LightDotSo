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

import type { FC } from "react";
import { DataTable } from "./data-table";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import type { Address } from "viem";
import { getConfiguration } from "@lightdotso/client";
import { columns } from "./columns";

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

type ConfigurationData = {
  address: string;
  checkpoint: number;
  id: string;
  image_hash: string;
  owners: {
    address: string;
    id: string;
    weight: number;
  }[];
  threshold: number;
};

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface OwnersDataTableProps {
  address: Address;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OwnersDataTable: FC<OwnersDataTableProps> = ({ address }) => {
  const currentData: ConfigurationData | undefined =
    useQueryClient().getQueryData(["configuration", address]);

  const { data: configuration } = useSuspenseQuery<ConfigurationData | null>({
    queryKey: ["configuration", address],
    queryFn: async () => {
      if (!address) {
        return null;
      }

      const res = await getConfiguration({
        params: {
          query: {
            address: address,
          },
        },
      });

      // Return if the response is 200
      return res.match(
        data => {
          return data;
        },
        _ => {
          return currentData ?? null;
        },
      );
    },
  });

  return <DataTable data={configuration?.owners ?? []} columns={columns} />;
};