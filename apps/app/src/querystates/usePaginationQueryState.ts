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

import type { PaginationState } from "@tanstack/react-table";
import { createParser, useQueryState } from "next-usequerystate";

// -----------------------------------------------------------------------------
// Parser
// -----------------------------------------------------------------------------

export const paginationParser = createParser({
  parse(value: string): PaginationState | null {
    if (!value) {
      return null;
    }
    const [pageIndex, pageSize] = value
      .split(",")
      .map(val => Number.parseInt(val));
    if (isNaN(pageIndex) || isNaN(pageSize)) {
      return null;
    }
    return { pageIndex, pageSize };
  },
  serialize(value: PaginationState): string {
    return `${value.pageIndex},${value.pageSize}`;
  },
}).withDefault({ pageIndex: 0, pageSize: 10 });

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export const usePaginationQueryState = () => {
  return useQueryState("pagination", paginationParser);
};
