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

use ethers::types::Address;
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, Bytes};
pub type Signature = Vec<u8>;

/// The struct representation of a wallet signer
/// Derived from: https://github.com/0xsequence/go-sequence/blob/eabca0c348b5d87dd943a551908c80f61c347899/config.go#L17
/// License: Apache-2.0
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct Signer {
    pub weight: u8,
    pub address: Address,
    pub leaf: SignatureLeaf,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct SignerNode {
    pub signer: Option<Signer>,
    pub left: Option<Box<SignerNode>>,
    pub right: Option<Box<SignerNode>>,
}

/// The struct representation of a wallet config
/// Derived from: https://github.com/0xsequence/go-sequence/blob/eabca0c348b5d87dd943a551908c80f61c347899/config.go#L12
/// License: Apache-2.0
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct WalletConfig {
    // Bytes32 hash of the checkpoint
    pub checkpoint: u32,
    // Uint16 threshold
    pub threshold: u16,
    // Uint256 weight of the retured signature
    pub weight: usize,
    // Image hash of the wallet config that is used to verify the wallet
    pub image_hash: [u8; 32],
    // Signers of the wallet
    pub tree: SignerNode,
    // Internal field used to store the image hash of the wallet config
    pub internal_root: Option<[u8; 32]>,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub enum SignatureLeaf {
    ECDSASignature(ECDSASignatureLeaf),
    AddressSignature(AddressSignatureLeaf),
    DynamicSignature(DynamicSignatureLeaf),
    NodeSignature(NodeLeaf),
    BranchSignature(BranchLeaf),
    SubdigestSignature(SubdigestLeaf),
    NestedSignature(NestedLeaf),
}

/// The enum representation of a signature leaf type
/// Derived from: https://github.com/0xsequence/wallet-contracts/blob/e0c5382636a88b4db4bcf0a70623355d7cd30fb4/contracts/modules/commons/submodules/auth/SequenceBaseSig.sol#L102
/// License: Apache-2.0
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[repr(u8)]
pub enum SignatureLeafType {
    ECDSASignature = 0,
    Address = 1,
    DynamicSignature = 2,
    Node = 3,
    Branch = 4,
    Subdigest = 5,
    Nested = 6,
}

/// The struct representation of an ECDSA signature leaf type
/// Derived from: https://github.com/0xsequence/wallet-contracts/blob/e0c5382636a88b4db4bcf0a70623355d7cd30fb4/contracts/utils/SignatureValidator.sol#L83
/// License: Apache-2.0
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[repr(u8)]
pub enum ECDSASignatureType {
    ECDSASignatureTypeEIP712 = 1,
    ECDSASignatureTypeEthSign = 2,
}

/// The constant length of an ECDSA signature
/// The actual length of the signature is 65 bytes + 1 byte for the signature type
/// Add 1 byte for the signature type
pub const ECDSA_SIGNATURE_LENGTH: usize = 65;

pub const ERC1271_MAGICVALUE_BYTES32: [u8; 4] = [22, 38, 186, 126];

#[serde_as]
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct ECDSASignatureLeaf {
    pub address: Address,
    pub signature_type: ECDSASignatureType,
    #[serde_as(as = "Bytes")]
    pub signature: [u8; ECDSA_SIGNATURE_LENGTH],
}

#[serde_as]
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct AddressSignatureLeaf {
    pub address: Address,
}

/// The struct representation of a Dynamic signature leaf type
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[repr(u8)]
pub enum DynamicSignatureType {
    DynamicSignatureTypeEIP712 = 1,
    DynamicSignatureTypeEthSign = 2,
    DynamicSignatureTypeEIP1271 = 3,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct DynamicSignatureLeaf {
    pub address: Address,
    pub signature_type: DynamicSignatureType,
    pub signature: Vec<u8>,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct NodeLeaf {}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct BranchLeaf {}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct SubdigestLeaf {}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct NestedLeaf {
    pub internal_threshold: u16,
    pub external_weight: u8,
    pub address: Address,
    pub internal_root: [u8; 32],
}