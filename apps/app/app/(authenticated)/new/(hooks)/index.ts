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

export { nameParser, useNameQueryState } from "./useNameQueryState";
export {
  inviteCodeParser,
  useInviteCodeQueryState,
} from "./useInviteCodeQueryState";
export { ownerParser, useOwnersQueryState } from "./useOwnersQueryState";
export type { Owner, Owners } from "./useOwnersQueryState";
export { saltParser, useSaltQueryState } from "./useSaltQueryState";
export {
  thresholdParser,
  useThresholdQueryState,
} from "./useThresholdQueryState";
export { typeParser, useTypeQueryState } from "./useTypeQueryState";
export type { WalletType } from "./useTypeQueryState";
