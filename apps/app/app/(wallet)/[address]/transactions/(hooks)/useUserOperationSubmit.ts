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

import {
  getPaymasterOperation,
  getSignatureUserOperation,
  sendUserOperation,
} from "@lightdotso/client";
import { CONTRACT_ADDRESSES } from "@lightdotso/const";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useState, useEffect } from "react";
import { toHex, fromHex, recoverMessageAddress } from "viem";
import type { Hex, Address } from "viem";
import type { ConfigurationData, UserOperationData } from "@/data";
import { queries } from "@/queries";
import { errorToast, successToast } from "@/utils";
import {
  useLightVerifyingPaymasterGetHash,
  useLightVerifyingPaymasterSenderNonce,
} from "@/wagmi";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type OpCreateCardProps = {
  address: Address;
  config: ConfigurationData;
  userOperation: UserOperationData;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const useUserOperationSubmit = ({
  // address,
  config,
  userOperation,
}: OpCreateCardProps) => {
  const [recoveredAddress, setRecoveredAddress] = useState<Address>();

  // Get the cumulative weight of all owners in the userOperation signatures array and check if it is greater than or equal to the threshold
  const isValid =
    userOperation.signatures.reduce((acc, signature) => {
      return (
        acc +
        ((config &&
          config.owners.find(owner => owner.id === signature?.owner_id)
            ?.weight) ||
          0)
      );
    }, 0) >= (config ? config.threshold : 0);

  // ---------------------------------------------------------------------------
  // Wagmi
  // ---------------------------------------------------------------------------

  const { data: paymasterHash } = useLightVerifyingPaymasterGetHash({
    address: userOperation.paymaster_and_data.slice(0, 42) as Address,
    chainId: userOperation.chain_id,
    args: [
      {
        sender: userOperation.sender as Address,
        nonce: BigInt(userOperation.nonce),
        initCode: userOperation.init_code as Hex,
        callData: userOperation.call_data as Hex,
        callGasLimit: BigInt(userOperation.call_gas_limit),
        verificationGasLimit: BigInt(userOperation.verification_gas_limit),
        preVerificationGas: BigInt(userOperation.pre_verification_gas),
        maxFeePerGas: BigInt(userOperation.max_fee_per_gas),
        maxPriorityFeePerGas: BigInt(userOperation.max_priority_fee_per_gas),
        paymasterAndData: userOperation.paymaster_and_data as Hex,
        signature: toHex(new Uint8Array([2])),
      },
      fromHex(
        `0x${userOperation.paymaster_and_data.slice(154, 162)}`,
        "number",
      ),
      fromHex(
        `0x${userOperation.paymaster_and_data.slice(162, 170)}`,
        "number",
      ),
    ],
  });

  const { data: paymasterNonce } = useLightVerifyingPaymasterSenderNonce({
    address: userOperation.paymaster_and_data.slice(0, 42) as Address,
    chainId: Number(userOperation.chain_id),
    args: [userOperation.sender as Address],
  });

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { data: paymasterOperation } = useSuspenseQuery({
    queryKey: queries.paymaster_operation.get({
      address: userOperation.paymaster_and_data.slice(0, 42) as Address,
      chainId: userOperation.chain_id,
      valid_after: fromHex(
        `0x${userOperation.paymaster_and_data.slice(162, 170)}`,
        "number",
      ),
    }).queryKey,
    queryFn: async () => {
      const res = await getPaymasterOperation({
        params: {
          query: {
            address: userOperation.paymaster_and_data.slice(0, 42) as Address,
            chain_id: userOperation.chain_id,
            valid_after: fromHex(
              `0x${userOperation.paymaster_and_data.slice(162, 170)}`,
              "number",
            ),
          },
        },
      });

      // Return if the response is 200
      return res.match(
        data => {
          return data;
        },
        _ => {
          return null;
        },
      );
    },
  });

  const paymasterSignedMsg = `0x${userOperation.paymaster_and_data.slice(
    170,
  )}` as Hex;

  useEffect(() => {
    const recoverAddress = async () => {
      if (paymasterHash) {
        try {
          const address = await recoverMessageAddress({
            message: { raw: paymasterHash },
            signature: paymasterSignedMsg,
          });
          setRecoveredAddress(address);
        } catch (e) {
          console.error(e);
        }
      }
    };

    recoverAddress();
  }, [paymasterHash, paymasterSignedMsg]);

  // A `useCallback` handler for confirming the operation
  const handleConfirm = useCallback(() => {
    const processSignature = async () => {
      // Get the sig as bytes from caller
      const sigRes = await getSignatureUserOperation({
        params: { query: { user_operation_hash: userOperation.hash } },
      });

      await sigRes.match(
        async sig => {
          // Sned the user operation
          const res = await sendUserOperation(userOperation.chain_id, [
            {
              sender: userOperation.sender,
              nonce: toHex(userOperation.nonce),
              initCode: userOperation.init_code,
              callData: userOperation.call_data,
              paymasterAndData: userOperation.paymaster_and_data,
              callGasLimit: toHex(userOperation.call_gas_limit),
              verificationGasLimit: toHex(userOperation.verification_gas_limit),
              preVerificationGas: toHex(userOperation.pre_verification_gas),
              maxFeePerGas: toHex(userOperation.max_fee_per_gas),
              maxPriorityFeePerGas: toHex(
                userOperation.max_priority_fee_per_gas,
              ),
              signature: sig,
            },
            CONTRACT_ADDRESSES["Entrypoint"],
          ]);

          res.match(
            _ => {
              successToast("You submitted the userOperation result");
            },
            err => {
              if (err instanceof Error) {
                errorToast(err.message);
              }
            },
          );
        },
        async err => {
          errorToast(JSON.stringify(err, null, 2));
        },
      );
    };

    processSignature();
  }, [userOperation]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return {
    isValid,
    paymasterNonce,
    paymasterOperation,
    paymasterSignedMsg,
    recoveredAddress,
    handleConfirm,
  };
};
