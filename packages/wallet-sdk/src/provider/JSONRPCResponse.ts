import { AddressString, HexString } from '../core/type';
import { JSONRPCMethod } from './JSONRPCMethod';

export type JSONRPCResponse<M extends JSONRPCMethod = JSONRPCMethod> = {
  jsonrpc: '2.0';
  id: number;
  result: Extract<_JSONRPCResponse, { method: M }>['result'];
};

export type JSONRPCResponseError = {
  jsonrpc: '2.0';
  id: number;
  error: {
    code: number;
    message: string;
    data?: unknown;
  };
};

type _JSONRPCResponse =
  | {
      method: 'eth_accounts';
      result: string[];
    }
  | {
      method: 'eth_coinbase';
      result: string;
    }
  | {
      method: 'net_version';
      result: string;
    }
  | {
      method: 'eth_chainId';
      result: string;
    }
  | {
      method: 'eth_uninstallFilter';
      result: boolean;
    }
  | {
      method: 'eth_requestAccounts';
      result: AddressString[];
    }
  | {
      method: 'eth_sign';
      result: HexString;
    }
  | {
      method: 'eth_ecRecover';
      result: AddressString;
    }
  | {
      method: 'personal_sign';
      result: HexString;
    }
  | {
      method: 'personal_ecRecover';
      result: AddressString;
    }
  | {
      method: 'eth_signTransaction';
      result: HexString;
    }
  | {
      method: 'eth_sendRawTransaction';
      result: HexString;
    }
  | {
      method: 'eth_sendTransaction';
      result: HexString;
    }
  | {
      method: 'eth_signTypedData_v1';
      result: HexString;
    }
  | {
      method: 'eth_signTypedData_v2';
      result: never;
    }
  | {
      method: 'eth_signTypedData_v3';
      result: HexString;
    }
  | {
      method: 'eth_signTypedData_v4';
      result: HexString;
    }
  | {
      method: 'eth_signTypedData';
      result: HexString;
    }
  | {
      method: 'wallet_addEthereumChain';
      result: null;
    }
  | {
      method: 'wallet_switchEthereumChain';
      result: null;
    }
  | {
      method: 'wallet_watchAsset';
      result: boolean;
    }
  | {
      method: 'eth_subscribe';
      result: unknown;
    }
  | {
      method: 'eth_unsubscribe';
      result: unknown;
    }
  | {
      method: 'eth_newFilter';
      result: HexString;
    }
  | {
      method: 'eth_newBlockFilter';
      result: HexString;
    }
  | {
      method: 'eth_newPendingTransactionFilter';
      result: HexString;
    }
  | {
      method: 'eth_getFilterChanges';
      result: unknown;
    }
  | {
      method: 'eth_getFilterLogs';
      result: unknown;
    }
  | {
      method: 'eth_getBlockByNumber';
      result: { hash: string };
    };
