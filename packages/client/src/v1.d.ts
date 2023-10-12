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
    get: operations["v1_get_handler"];
  };
  "/configuration/list": {
    /**
     * Returns a list of configurations.
     * @description Returns a list of configurations.
     */
    get: operations["v1_list_handler"];
  };
  "/health": {
    /**
     * Check the health of the server.
     * @description Check the health of the server.
     */
    get: operations["handler"];
  };
  "/wallet/create": {
    /**
     * Create a wallet
     * @description Create a wallet
     */
    post: operations["v1_post_handler"];
  };
  "/wallet/get": {
    /**
     * Get a wallet
     * @description Get a wallet
     */
    get: operations["v1_get_handler"];
  };
  "/wallet/list": {
    /**
     * Returns a list of wallets.
     * @description Returns a list of wallets.
     */
    get: operations["v1_list_handler"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description Item to do. */
    Configuration: {
      address: string;
      id: string;
    };
    /** @description Configuration operation errors */
    ConfigurationError: OneOf<[{
      BadRequest: string;
    }, {
      /** @description Configuration not found by id. */
      NotFound: string;
    }]>;
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
    PostRequestParams: {
      /**
       * @example [
       *   {
       *     "address": "0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed",
       *     "weight": 1
       *   }
       * ]
       */
      owners: components["schemas"]["Owner"][];
      /**
       * @default 0x0000000000000000000000000000000000000000000000000000000000000001
       * @example 0x0000000000000000000000000000000000000000000000000000000000000006
       */
      salt: string;
      /**
       * Format: int32
       * @default 1
       * @example 3
       */
      threshold: number;
    };
    /** @description Wallet to do. */
    Wallet: {
      address: string;
      factory_address: string;
      id: string;
    };
    /** @description Wallet operation errors */
    WalletError: OneOf<[{
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
   * Get a wallet
   * @description Get a wallet
   */
  v1_get_handler: {
    parameters: {
      query: {
        address: string;
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
  v1_list_handler: {
    parameters: {
      query?: {
        offset?: number | null;
        limit?: number | null;
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
   * Create a wallet
   * @description Create a wallet
   */
  v1_post_handler: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostRequestParams"];
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
      /** @description Wallet internal error */
      500: {
        content: {
          "application/json": components["schemas"]["WalletError"];
        };
      };
    };
  };
}
