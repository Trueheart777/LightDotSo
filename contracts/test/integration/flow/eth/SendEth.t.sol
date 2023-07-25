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

// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.18;

import {EntryPoint} from "@/contracts/core/EntryPoint.sol";
import {LightWallet, UserOperation} from "@/contracts/LightWallet.sol";
import {BaseIntegrationTest} from "@/test/base/BaseIntegrationTest.t.sol";
import {ERC4337Utils} from "@/test/utils/ERC4337Utils.sol";

using ERC4337Utils for EntryPoint;

/// @notice Integration tests for `LightWallet` sending ETH
contract SendEthIntegrationTest is BaseIntegrationTest {
    // -------------------------------------------------------------------------
    // Variables
    // -------------------------------------------------------------------------

    // Internal operational callData to send
    bytes internal callData;

    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------

    function setUp() public virtual override {
        // Setup the base factory tests
        BaseIntegrationTest.setUp();

        // Set the operational callData
        callData = abi.encodeWithSelector(LightWallet.execute.selector, address(1), 1, bytes(""));
    }

    // -------------------------------------------------------------------------
    // Tests
    // -------------------------------------------------------------------------

    /// Tests that the account revert when sending ETH from a non-entrypoint
    function test_revertWhenNotEntrypoint_transferEth() public {
        vm.expectRevert(bytes("account: not from EntryPoint"));
        (bool ok,) = address(account).call(callData);
    }

    /// Tests that the account can correctly transfer ETH
    function test_revertWhenInvalidSignature_transferEth() public {
        // Example UserOperation to send 0 ETH to the address one
        UserOperation[] memory ops = entryPoint.signPackUserOp(lightWalletUtils, address(account), callData, userKey);
        ops[0].signature = bytes("invalid");
        vm.expectRevert();
        entryPoint.handleOps(ops, beneficiary);
    }

    /// Tests that the account can correctly transfer ETH
    function test_transferEth() public {
        // Example UserOperation to send 0 ETH to the address one
        UserOperation[] memory ops = entryPoint.signPackUserOp(lightWalletUtils, address(account), callData, userKey);
        entryPoint.handleOps(ops, beneficiary);

        // Assert that the balance of the account is 1
        assertEq(address(1).balance, 1);
    }
}