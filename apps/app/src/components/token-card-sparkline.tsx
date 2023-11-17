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

import type { Address } from "viem";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { getTokenPrice } from "@lightdotso/client";
import { SparkAreaChart } from "@tremor/react";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type TokenCardSparklineProps = {
  address: Address;
  chain_id: number;
};

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

type TokenPriceData = {
  price: number;
  price_change_24h: number;
  price_change_24h_percentage: number;
  prices: {
    date: string;
    price: number;
  }[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TokenCardSparkline: FC<TokenCardSparklineProps> = ({
  address,
  chain_id,
}) => {
  const currentData: TokenPriceData | undefined = useQueryClient().getQueryData(
    ["token_price", address, chain_id],
  );

  const { data: token_price } = useSuspenseQuery<TokenPriceData | null>({
    queryKey: ["token_price", address, chain_id],
    queryFn: async () => {
      if (!address) {
        return null;
      }

      const res = await getTokenPrice({
        params: {
          query: {
            address: address,
            chain_id: chain_id,
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

  if (!token_price) {
    return null;
  }

  return (
    <SparkAreaChart
      data={[...token_price.prices].reverse()}
      categories={["price"]}
      index="date"
      colors={[
        token_price.price_change_24h && token_price.price_change_24h > 0
          ? "emerald"
          : "red",
      ]}
      className="h-12 w-48"
      // @ts-expect-error
      showAnimation
    />
  );
};
