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
import {LightWalletFactory} from "@/contracts/LightWalletFactory.sol";
import {BaseLightDeployer} from "@/script/base/BaseLightDeployer.s.sol";
// solhint-disable-next-line no-console
import {console} from "forge-std/console.sol";
import {Script} from "forge-std/Script.sol";

// LightWalletFactoryDeployer -- Deploys the LightWalletFactory contract
contract LightWalletFactoryDeployer is BaseLightDeployer, Script {
    // -------------------------------------------------------------------------
    // Bytecode
    // -------------------------------------------------------------------------

    bytes private byteCode = type(LightWalletFactory).creationCode;
    bytes private initCode = abi.encodePacked(byteCode, abi.encode(address(ENTRY_POINT_ADDRESS)));

    // -------------------------------------------------------------------------
    // Run
    // -------------------------------------------------------------------------

    function run() public {
        // Log the byte code hash
        // solhint-disable-next-line no-console
        console.logBytes32(keccak256(initCode));
        // The init code hash of the LightWalletFactory
        bytes32 initCodeHash = 0x8957ba1f77a4becdcfe5a5e01d4516901271037e93597fe921161829034d540e;
        // Assert that the init code is the expected value
        assert(keccak256(initCode) == initCodeHash);

        // Salt for deterministic deployment
        bytes32 salt = 0x0000000000000000000000000000000000000000a2850b49daa90b2a103159bd;

        // If testing on a local chain, use without a safe create2
        if (block.chainid == 0x7a69) {
            // Use private key
            vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

            // Construct the entrypoint
            entryPoint = new EntryPoint();

            // Create the factory
            factory = new LightWalletFactory(entryPoint);
        } else {
            // Use regular broadcast
            vm.startBroadcast();

            // Create LightWalletFactory
            factory = LightWalletFactory(IMMUTABLE_CREATE2_FACTORY.safeCreate2(salt, initCode));

            // Assert that the factory is the expected address
            assert(address(factory) == LIGHT_FACTORY_ADDRESS);
        }

        // Stop the broadcast
        vm.stopBroadcast();
    }
}
