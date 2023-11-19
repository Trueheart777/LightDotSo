/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


/** OneOf type helpers */
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type OneOf<T extends any[]> = T extends [infer Only] ? Only : T extends [infer A, infer B, ...infer Rest] ? OneOf<[XOR<A, B>, ...Rest]> : never;

export interface paths {
  "/check": {
    /**
     * Check if the server is running.
     * @description Check if the server is running.
     */
    get: operations["handler"];
  };
  "/configuration/get": {
    /**
     * Get a configuration
     * @description Get a configuration
     */
    get: operations["v1_configuration_get_handler"];
  };
  "/configuration/list": {
    /**
     * Returns a list of configurations.
     * @description Returns a list of configurations.
     */
    get: operations["v1_configuration_list_handler"];
  };
  "/feedback/create": {
    /**
     * Create a feedback
     * @description Create a feedback
     */
    post: operations["v1_feedback_post_handler"];
  };
  "/health": {
    /**
     * Check the health of the server.
     * @description Check the health of the server.
     */
    get: operations["handler"];
  };
  "/notification/get": {
    /**
     * Get a notification
     * @description Get a notification
     */
    get: operations["v1_notification_get_handler"];
  };
  "/notification/list": {
    /**
     * Returns a list of notifications.
     * @description Returns a list of notifications.
     */
    get: operations["v1_notification_list_handler"];
  };
  "/notification/read": {
    /**
     * Read a list of notifications
     * @description Read a list of notifications
     */
    post: operations["v1_notification_read_handler"];
  };
  "/paymaster/get": {
    /**
     * Get a paymaster
     * @description Get a paymaster
     */
    get: operations["v1_paymaster_get_handler"];
  };
  "/paymaster/list": {
    /**
     * Returns a list of paymasters.
     * @description Returns a list of paymasters.
     */
    get: operations["v1_paymaster_list_handler"];
  };
  "/portfolio/get": {
    /**
     * Get a portfolio
     * @description Get a portfolio
     */
    get: operations["v1_portfolio_get_handler"];
  };
  "/signature/create": {
    /**
     * Create a signature
     * @description Create a signature
     */
    post: operations["v1_signature_post_handler"];
  };
  "/signature/get": {
    /**
     * Get a signature
     * @description Get a signature
     */
    get: operations["v1_signature_get_handler"];
  };
  "/signature/list": {
    /**
     * Returns a list of signatures.
     * @description Returns a list of signatures.
     */
    get: operations["v1_signature_list_handler"];
  };
  "/support_request/create": {
    /**
     * Create a support_request
     * @description Create a support_request
     */
    post: operations["v1_support_request_post_handler"];
  };
  "/token/get": {
    /**
     * Get a token
     * @description Get a token
     */
    get: operations["v1_token_get_handler"];
  };
  "/token/list": {
    /**
     * Returns a list of tokens.
     * @description Returns a list of tokens.
     */
    get: operations["v1_token_list_handler"];
  };
  "/token_price/get": {
    /**
     * Get a token_price
     * @description Get a token_price
     */
    get: operations["v1_token_price_get_handler"];
  };
  "/transaction/get": {
    /**
     * Get a transaction
     * @description Get a transaction
     */
    get: operations["v1_transaction_get_handler"];
  };
  "/transaction/list": {
    /**
     * Returns a list of transactions.
     * @description Returns a list of transactions.
     */
    get: operations["v1_transaction_list_handler"];
  };
  "/user/get": {
    /**
     * Get a user
     * @description Get a user
     */
    get: operations["v1_user_get_handler"];
  };
  "/user_operation/create": {
    /**
     * Create a user operation
     * @description Create a user operation
     */
    post: operations["v1_user_operation_post_handler"];
  };
  "/user_operation/get": {
    /**
     * Get a user operation
     * @description Get a user operation
     */
    get: operations["v1_user_operation_get_handler"];
  };
  "/user_operation/list": {
    /**
     * Returns a list of user operations.
     * @description Returns a list of user operations.
     */
    get: operations["v1_user_operation_list_handler"];
  };
  "/user_operation/nonce": {
    /**
     * Get a user operation nonce
     * @description Get a user operation nonce
     */
    get: operations["v1_user_operation_nonce_handler"];
  };
  "/user_operation/signature": {
    /**
     * Check a user operation for its validity and return the computed signature if valid.
     * @description Check a user operation for its validity and return the computed signature if valid.
     */
    get: operations["v1_user_operation_signature_handler"];
  };
  "/wallet/create": {
    /**
     * Create a wallet
     * @description Create a wallet
     */
    post: operations["v1_wallet_post_handler"];
  };
  "/wallet/get": {
    /**
     * Get a wallet
     * @description Get a wallet
     */
    get: operations["v1_wallet_get_handler"];
  };
  "/wallet/list": {
    /**
     * Returns a list of wallets.
     * @description Returns a list of wallets.
     */
    get: operations["v1_wallet_list_handler"];
  };
  "/wallet/tab": {
    /**
     * Get a wallet tab
     * @description Get a wallet tab
     */
    get: operations["v1_wallet_tab_handler"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description Item to do. */
    Configuration: {
      /** @description The address of the configuration. */
      address: string;
      /**
       * Format: int64
       * @description The checkpoint of the configuration.
       */
      checkpoint: number;
      /** @description The id of the configuration. */
      id: string;
      /** @description The image hash of the configuration. */
      image_hash: string;
      /** @description The owners of the configuration. */
      owners: components["schemas"]["ConfigurationOwner"][];
      /**
       * Format: int64
       * @description The threshold of the configuration.
       */
      threshold: number;
    };
    /** @description Configuration operation errors */
    ConfigurationError: OneOf<[{
      /** @description Configuration query error. */
      BadRequest: string;
    }, {
      /** @description Configuration not found by id. */
      NotFound: string;
    }]>;
    /** @description Owner */
    ConfigurationOwner: {
      /** @description The address of the owner. */
      address: string;
      /** @description The id of the owner. */
      id: string;
      /**
       * Format: int32
       * @description The index of the owner.
       */
      index: number;
      /**
       * Format: int64
       * @description The weight of the owner.
       */
      weight: number;
    };
    /** @description Item to do. */
    Feedback: {
      emoji: string;
      text: string;
    };
    /** @description Feedback operation errors */
    FeedbackError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Feedback not found by id. */
      NotFound: string;
    }]>;
    FeedbackPostRequestParams: {
      feedback: components["schemas"]["Feedback"];
    };
    /** @description Item to do. */
    Notification: {
      id: string;
    };
    /** @description Notification operation errors */
    NotificationError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Notification not found by id. */
      NotFound: string;
    }]>;
    /** @description Item to request. */
    NotificationReadRequest: {
      id: string;
    };
    NotificationReadRequestParams: {
      /** @description The array of the notifications to query. */
      notifications: components["schemas"]["NotificationReadRequest"][];
    };
    /**
     * @description Wallet owner.
     * @example {
     *   "address": "0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed",
     *   "weight": 1
     * }
     */
    Owner: {
      /** @description The address of the owner. */
      address: string;
      /**
       * Format: int32
       * @description The weight of the owner.
       */
      weight: number;
    };
    /** @description Item to do. */
    Paymaster: {
      address: string;
    };
    /** @description Paymaster operation errors */
    PaymasterError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Paymaster not found by id. */
      NotFound: string;
    }]>;
    /** @description Item to do. */
    Portfolio: {
      /** Format: double */
      balance: number;
      /** Format: double */
      balance_change_24h: number;
      /** Format: double */
      balance_change_24h_percentage: number;
      balances: components["schemas"]["PortfolioBalanceDate"][];
    };
    /** @description Portfolio to do. */
    PortfolioBalanceDate: {
      /** Format: double */
      balance: number;
      date: string;
    };
    /** @description Portfolio operation errors */
    PortfolioError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Portfolio already exists conflict. */
      Conflict: string;
    }]>;
    /** @description Item to do. */
    Signature: {
      owner_id: string;
      signature: string;
      /** Format: int32 */
      signature_type: number;
    };
    /** @description Signature operation errors */
    SignatureError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Signature not found by id. */
      NotFound: string;
    }]>;
    SignaturePostRequestParams: {
      signature: components["schemas"]["Signature"];
    };
    /** @description Item to do. */
    SupportRequest: {
      area: string;
      description: string;
      /** Format: int32 */
      severity: number;
      title: string;
    };
    /** @description Support_request operation errors */
    SupportRequestError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Support_request not found by id. */
      NotFound: string;
    }]>;
    SupportRequestPostRequestParams: {
      support_request: components["schemas"]["SupportRequest"];
    };
    /** @description Item to do. */
    Token: {
      address: string;
      /** Format: int64 */
      amount: number;
      /** Format: double */
      balance_usd: number;
      /** Format: int64 */
      chain_id: number;
      /** Format: int32 */
      decimals: number;
      name?: string | null;
      symbol: string;
    };
    /** @description Token operation errors */
    TokenError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Token not found by id. */
      NotFound: string;
    }]>;
    /** @description Item to do. */
    TokenPrice: {
      /** Format: double */
      price: number;
      /** Format: double */
      price_change_24h: number;
      /** Format: double */
      price_change_24h_percentage: number;
      prices: components["schemas"]["TokenPriceDate"][];
    };
    TokenPriceDate: {
      date: string;
      /** Format: double */
      price: number;
    };
    /** @description TokenPrice operation errors */
    TokenPriceError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description TokenPrice not found by id. */
      NotFound: string;
    }]>;
    /** @description Item to do. */
    Transaction: {
      hash: string;
    };
    /** @description Transaction operation errors */
    TransactionError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Transaction not found by id. */
      NotFound: string;
    }]>;
    /** @description Item to do. */
    User: {
      id: string;
    };
    /** @description User operation errors */
    UserError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description User not found by id. */
      NotFound: string;
    }]>;
    /** @description Item to do. */
    UserOperation: {
      call_data: string;
      /** Format: int64 */
      call_gas_limit: number;
      /** Format: int64 */
      chain_id: number;
      hash: string;
      init_code: string;
      /** Format: int64 */
      max_fee_per_gas: number;
      /** Format: int64 */
      max_priority_fee_per_gas: number;
      /** Format: int64 */
      nonce: number;
      paymaster?: components["schemas"]["UserOperationPaymaster"] | null;
      paymaster_and_data: string;
      /** Format: int64 */
      pre_verification_gas: number;
      sender: string;
      signatures: components["schemas"]["UserOperationSignature"][];
      status: string;
      transaction?: components["schemas"]["UserOperationTransaction"] | null;
      /** Format: int64 */
      verification_gas_limit: number;
    };
    /** @description Item to create. */
    UserOperationCreate: {
      call_data: string;
      /** Format: int64 */
      call_gas_limit: number;
      /** Format: int64 */
      chain_id: number;
      hash: string;
      init_code: string;
      /** Format: int64 */
      max_fee_per_gas: number;
      /** Format: int64 */
      max_priority_fee_per_gas: number;
      /** Format: int64 */
      nonce: number;
      paymaster_and_data: string;
      /** Format: int64 */
      pre_verification_gas: number;
      sender: string;
      /** Format: int64 */
      verification_gas_limit: number;
    };
    /** @description User operation operation errors */
    UserOperationError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description User operation not found by id. */
      NotFound: string;
    }]>;
    /** @description Paymaster */
    UserOperationPaymaster: {
      /** @description The address of the paymaster. */
      address: string;
      /** @description The address of the sender. */
      sender: string;
      /**
       * Format: int64
       * @description The nonce of the sender.
       */
      sender_nonce: number;
    };
    UserOperationPostRequestParams: {
      paymaster?: components["schemas"]["UserOperationPaymaster"] | null;
      signature: components["schemas"]["UserOperationSignature"];
      user_operation: components["schemas"]["UserOperationCreate"];
    };
    /** @description Signature */
    UserOperationSignature: {
      /** @description The id of the owner of the signature. */
      owner_id: string;
      /** @description The signature in hex string. */
      signature: string;
      /**
       * Format: int32
       * @description The signature type
       */
      signature_type: number;
    };
    /** @description Transaction */
    UserOperationTransaction: {
      /** @description The hash of the transaction. */
      hash: string;
    };
    /** @description Wallet to do. */
    Wallet: {
      address: string;
      factory_address: string;
      name: string;
      salt: string;
    };
    /** @description Wallet operation errors */
    WalletError: OneOf<[{
      /** @description Wallet query error. */
      BadRequest: string;
    }, {
      /** @description Wallet already exists conflict. */
      Conflict: string;
    }, {
      /** @description Wallet not found by id. */
      NotFound: string;
    }, {
      /**
       * @description Wallet configuration is invalid.
       * The threshold is greater than the number of owners.
       * The threshold is 0.
       */
      InvalidConfiguration: string;
    }]>;
    WalletPostRequestParams: {
      /**
       * @description The name of the wallet.
       * @default My Wallet
       * @example My Wallet
       */
      name: string;
      /**
       * @description The array of owners of the wallet.
       * @example [
       *   {
       *     "address": "0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed",
       *     "weight": 1
       *   }
       * ]
       */
      owners: components["schemas"]["Owner"][];
      /**
       * @description The salt is used to calculate the new wallet address.
       * @default 0x0000000000000000000000000000000000000000000000000000000000000001
       * @example 0x0000000000000000000000000000000000000000000000000000000000000006
       */
      salt: string;
      /**
       * Format: int32
       * @description The threshold of the wallet.
       * @default 1
       * @example 3
       */
      threshold: number;
    };
    /** @description WalletTab to do. */
    WalletTab: {
      /**
       * Format: int64
       * @description The number of owners of the wallet.
       */
      owner_count: number;
      /**
       * Format: int64
       * @description The number of transactions of the wallet.
       */
      transaction_count: number;
      /**
       * Format: int64
       * @description The pending number of user_operations of the wallet.
       */
      user_operation_count: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * Check the health of the server.
   * @description Check the health of the server.
   */
  handler: {
    responses: {
      /** @description Health returned successfully */
      200: {
        content: never;
      };
    };
  };
  /**
   * Get a configuration
   * @description Get a configuration
   */
  v1_configuration_get_handler: {
    parameters: {
      query: {
        address: string;
        /** @description The optional checkpoint to filter by. */
        checkpoint?: number | null;
      };
    };
    responses: {
      /** @description Configuration returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Configuration"];
        };
      };
      /** @description Configuration not found */
      404: {
        content: {
          "application/json": components["schemas"]["ConfigurationError"];
        };
      };
    };
  };
  /**
   * Returns a list of configurations.
   * @description Returns a list of configurations.
   */
  v1_configuration_list_handler: {
    parameters: {
      query?: {
        /** @description The offset of the first configuration to return. */
        offset?: number | null;
        /** @description The maximum number of configurations to return. */
        limit?: number | null;
      };
    };
    responses: {
      /** @description Configurations returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Configuration"][];
        };
      };
      /** @description Configuration bad request */
      500: {
        content: {
          "application/json": components["schemas"]["ConfigurationError"];
        };
      };
    };
  };
  /**
   * Create a feedback
   * @description Create a feedback
   */
  v1_feedback_post_handler: {
    parameters: {
      query: {
        user_id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["FeedbackPostRequestParams"];
      };
    };
    responses: {
      /** @description Feedback created successfully */
      200: {
        content: {
          "application/json": components["schemas"]["UserOperation"];
        };
      };
      /** @description Feedback internal error */
      500: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Get a notification
   * @description Get a notification
   */
  v1_notification_get_handler: {
    parameters: {
      query: {
        notification_id: string;
      };
    };
    responses: {
      /** @description Notification returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Notification"];
        };
      };
      /** @description Notification not found */
      404: {
        content: {
          "application/json": components["schemas"]["NotificationError"];
        };
      };
    };
  };
  /**
   * Returns a list of notifications.
   * @description Returns a list of notifications.
   */
  v1_notification_list_handler: {
    parameters: {
      query?: {
        offset?: number | null;
        limit?: number | null;
      };
    };
    responses: {
      /** @description Notifications returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Notification"][];
        };
      };
      /** @description Notification bad request */
      500: {
        content: {
          "application/json": components["schemas"]["NotificationError"];
        };
      };
    };
  };
  /**
   * Read a list of notifications
   * @description Read a list of notifications
   */
  v1_notification_read_handler: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["NotificationReadRequestParams"];
      };
    };
    responses: {
      /** @description Notification created successfully */
      200: {
        content: {
          "text/plain": number;
        };
      };
      /** @description Notification internal error */
      500: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Get a paymaster
   * @description Get a paymaster
   */
  v1_paymaster_get_handler: {
    parameters: {
      query: {
        id: string;
      };
    };
    responses: {
      /** @description Paymaster returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Paymaster"];
        };
      };
      /** @description Paymaster not found */
      404: {
        content: {
          "application/json": components["schemas"]["PaymasterError"];
        };
      };
    };
  };
  /**
   * Returns a list of paymasters.
   * @description Returns a list of paymasters.
   */
  v1_paymaster_list_handler: {
    parameters: {
      query?: {
        offset?: number | null;
        limit?: number | null;
      };
    };
    responses: {
      /** @description Paymasters returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Paymaster"][];
        };
      };
      /** @description Paymaster bad request */
      500: {
        content: {
          "application/json": components["schemas"]["PaymasterError"];
        };
      };
    };
  };
  /**
   * Get a portfolio
   * @description Get a portfolio
   */
  v1_portfolio_get_handler: {
    parameters: {
      query: {
        /** @description The address of the portfolio. */
        address: string;
      };
    };
    responses: {
      /** @description Portfolio returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Portfolio"];
        };
      };
      /** @description Portfolio not found */
      404: {
        content: {
          "application/json": components["schemas"]["PortfolioError"];
        };
      };
    };
  };
  /**
   * Create a signature
   * @description Create a signature
   */
  v1_signature_post_handler: {
    parameters: {
      query: {
        user_operation_hash: string;
        procedure?: ("Offchain" | "Onchain" | "Erc1271") | null;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignaturePostRequestParams"];
      };
    };
    responses: {
      /** @description Signature created successfully */
      200: {
        content: {
          "application/json": components["schemas"]["UserOperation"];
        };
      };
      /** @description Invalid Configuration */
      400: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
      /** @description Signature already exists */
      409: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
      /** @description Signature internal error */
      500: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Get a signature
   * @description Get a signature
   */
  v1_signature_get_handler: {
    parameters: {
      query: {
        user_operation_hash: string;
      };
    };
    responses: {
      /** @description Signature returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Signature"];
        };
      };
      /** @description Signature not found */
      404: {
        content: {
          "application/json": components["schemas"]["SignatureError"];
        };
      };
    };
  };
  /**
   * Returns a list of signatures.
   * @description Returns a list of signatures.
   */
  v1_signature_list_handler: {
    parameters: {
      query?: {
        offset?: number | null;
        limit?: number | null;
        user_operation_hash?: string | null;
      };
    };
    responses: {
      /** @description Signatures returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Signature"][];
        };
      };
      /** @description Signature bad request */
      500: {
        content: {
          "application/json": components["schemas"]["SignatureError"];
        };
      };
    };
  };
  /**
   * Create a support_request
   * @description Create a support_request
   */
  v1_support_request_post_handler: {
    parameters: {
      query: {
        wallet_address: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SupportRequestPostRequestParams"];
      };
    };
    responses: {
      /** @description SupportRequest created successfully */
      200: {
        content: {
          "application/json": components["schemas"]["UserOperation"];
        };
      };
      /** @description SupportRequest internal error */
      500: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Get a token
   * @description Get a token
   */
  v1_token_get_handler: {
    parameters: {
      query: {
        /** @description The address of the token. */
        address: string;
        /** @description The chain id of the token. */
        chain_id: number;
      };
    };
    responses: {
      /** @description Token returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Token"];
        };
      };
      /** @description Token not found */
      404: {
        content: {
          "application/json": components["schemas"]["TokenError"];
        };
      };
    };
  };
  /**
   * Returns a list of tokens.
   * @description Returns a list of tokens.
   */
  v1_token_list_handler: {
    parameters: {
      query: {
        offset?: number | null;
        limit?: number | null;
        address: string;
        /** @description The flag to indicate if the token is a spam. */
        is_spam?: boolean | null;
      };
    };
    responses: {
      /** @description Tokens returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Token"][];
        };
      };
      /** @description Token bad request */
      500: {
        content: {
          "application/json": components["schemas"]["TokenError"];
        };
      };
    };
  };
  /**
   * Get a token_price
   * @description Get a token_price
   */
  v1_token_price_get_handler: {
    parameters: {
      query: {
        /** @description The address of the token_price. */
        address: string;
        /** @description The chain id of the token_price. */
        chain_id: number;
      };
    };
    responses: {
      /** @description Token returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["TokenPrice"];
        };
      };
      /** @description Token not found */
      404: {
        content: {
          "application/json": components["schemas"]["TokenError"];
        };
      };
    };
  };
  /**
   * Get a transaction
   * @description Get a transaction
   */
  v1_transaction_get_handler: {
    parameters: {
      query: {
        transaction_hash: string;
      };
    };
    responses: {
      /** @description Transaction returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Transaction"];
        };
      };
      /** @description Transaction not found */
      404: {
        content: {
          "application/json": components["schemas"]["TransactionError"];
        };
      };
    };
  };
  /**
   * Returns a list of transactions.
   * @description Returns a list of transactions.
   */
  v1_transaction_list_handler: {
    parameters: {
      query?: {
        offset?: number | null;
        limit?: number | null;
        address?: string | null;
      };
    };
    responses: {
      /** @description Transactions returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Transaction"][];
        };
      };
      /** @description Transaction bad request */
      500: {
        content: {
          "application/json": components["schemas"]["TransactionError"];
        };
      };
    };
  };
  /**
   * Get a user
   * @description Get a user
   */
  v1_user_get_handler: {
    parameters: {
      query: {
        address: string;
      };
    };
    responses: {
      /** @description User returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description User not found */
      404: {
        content: {
          "application/json": components["schemas"]["UserError"];
        };
      };
    };
  };
  /**
   * Create a user operation
   * @description Create a user operation
   */
  v1_user_operation_post_handler: {
    parameters: {
      query: {
        chain_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserOperationPostRequestParams"];
      };
    };
    responses: {
      /** @description User Operation created successfully */
      200: {
        content: {
          "application/json": components["schemas"]["UserOperation"];
        };
      };
      /** @description Invalid Configuration */
      400: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
      /** @description User Operation already exists */
      409: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
      /** @description User Operation internal error */
      500: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Get a user operation
   * @description Get a user operation
   */
  v1_user_operation_get_handler: {
    parameters: {
      query: {
        user_operation_hash: string;
      };
    };
    responses: {
      /** @description User Operation returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["UserOperation"];
        };
      };
      /** @description User Operation not found */
      404: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Returns a list of user operations.
   * @description Returns a list of user operations.
   */
  v1_user_operation_list_handler: {
    parameters: {
      query?: {
        offset?: number | null;
        limit?: number | null;
        address?: string | null;
        status?: ("proposed" | "pending" | "executed" | "reverted") | null;
      };
    };
    responses: {
      /** @description User Operations returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["UserOperation"][];
        };
      };
      /** @description User Operation bad request */
      500: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Get a user operation nonce
   * @description Get a user operation nonce
   */
  v1_user_operation_nonce_handler: {
    parameters: {
      query: {
        chain_id: number;
        address: string;
      };
    };
    responses: {
      /** @description User Operation nonce returned successfully */
      200: {
        content: {
          "text/plain": number;
        };
      };
      /** @description User Operation nonce not found */
      404: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Check a user operation for its validity and return the computed signature if valid.
   * @description Check a user operation for its validity and return the computed signature if valid.
   */
  v1_user_operation_signature_handler: {
    parameters: {
      query: {
        user_operation_hash: string;
        signature_type?: number | null;
      };
    };
    responses: {
      /** @description User Operation signature returned successfully */
      200: {
        content: {
          "text/plain": string;
        };
      };
      /** @description User Operation not found */
      404: {
        content: {
          "application/json": components["schemas"]["UserOperationError"];
        };
      };
    };
  };
  /**
   * Create a wallet
   * @description Create a wallet
   */
  v1_wallet_post_handler: {
    parameters: {
      query?: {
        /** @description Whether to simulate the wallet creation. */
        simulate?: boolean | null;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["WalletPostRequestParams"];
      };
    };
    responses: {
      /** @description Wallet created successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Wallet"];
        };
      };
      /** @description Invalid Configuration */
      400: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
      /** @description Wallet already exists */
      409: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
      /** @description Wallet internal error */
      500: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
    };
  };
  /**
   * Get a wallet
   * @description Get a wallet
   */
  v1_wallet_get_handler: {
    parameters: {
      query: {
        /** @description The address of the wallet. */
        address: string;
        /** @description The chain id of the wallet. */
        chain_id?: number | null;
      };
    };
    responses: {
      /** @description Wallet returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Wallet"];
        };
      };
      /** @description Wallet not found */
      404: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
    };
  };
  /**
   * Returns a list of wallets.
   * @description Returns a list of wallets.
   */
  v1_wallet_list_handler: {
    parameters: {
      query?: {
        /** @description The offset of the first wallet to return. */
        offset?: number | null;
        /** @description The maximum number of wallets to return. */
        limit?: number | null;
        /** @description A filter to return wallets w/ a given owner. */
        owner?: string | null;
      };
    };
    responses: {
      /** @description Wallets returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Wallet"][];
        };
      };
      /** @description Wallet bad request */
      500: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
    };
  };
  /**
   * Get a wallet tab
   * @description Get a wallet tab
   */
  v1_wallet_tab_handler: {
    parameters: {
      query: {
        /** @description The address of the wallet. */
        address: string;
        /** @description The chain id of the wallet. */
        chain_id?: number | null;
      };
    };
    responses: {
      /** @description Wallet tab returned successfully */
      200: {
        content: {
          "application/json": components["schemas"]["WalletTab"];
        };
      };
      /** @description Wallet tab not found */
      404: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
    };
  };
}
