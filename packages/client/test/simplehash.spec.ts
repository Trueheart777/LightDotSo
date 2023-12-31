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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test, expect } from "vitest";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getNftsByOwner, getNftValuation } from "../src"; // Replace with your actual file path
// Load dotenv
import "dotenv/config";

test("getNftsByOwner", async () => {
  // Call your function with actual address
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const actualAddress = "0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed"; // replace with actual address
  await getNftsByOwner({ address: actualAddress });
  // const result = await getNftsByOwner(actualAddress);

  // Expect that status is either "success" or "stale"
  // expect(result._unsafeUnwrap().status, "status").tobe([
  //   "success",
  //   "stale",
  // ]);
  // Check that the array length is greater than 0
  // expect(
  //   (result as { _unsafeUnwrap: () => any })._unsafeUnwrap().wallets.length,
  // ).toBeGreaterThan(0);

  // Log the result
  // console.log(result._unsafeUnwrap());

  // Log the result
  // console.log(result._unsafeUnwrap());
});

test("getNftValuation", async () => {
  // Call your function with actual address
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const actualAddress = "0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed"; // replace with actual address
  await getNftValuation(actualAddress);
  // const result = await getNftValuation(actualAddress);

  // Expect that status is either "success" or "stale"
  // expect(result._unsafeUnwrap().status, "status").tobe([
  //   "success",
  //   "stale",
  // ]);
  // Check that the array length is greater than 0
  // expect(result._unsafeUnwrap().wallets.length).toBeGreaterThan(0);

  // Log the result
  // console.log(result._unsafeUnwrap());
});
