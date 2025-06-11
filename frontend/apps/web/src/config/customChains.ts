/* eslint-disable prettier/prettier */

import type { ChainInfo, RpcUri } from '@safe-global/safe-gateway-typescript-sdk'
import { RPC_AUTHENTICATION } from '@safe-global/safe-gateway-typescript-sdk'

const rpcUri: RpcUri = {
    authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
    value: 'https://rpc.testnet.edexa.com',
}

export const edexaChain: ChainInfo = {
    chainId: '1995',
    chainName: 'edeXa',
    description: 'edexa testnet',
    shortName: 'edx',
    l2: true,
    isTestnet: true,
    chainLogoUri: 'https://s2.coinmarketcap.com/static/img/coins/200x200/23192.png',
    nativeCurrency: {
        name: 'edexa',
        symbol: 'ETH',
        decimals: 18,
        logoUri: 'https://s2.coinmarketcap.com/static/img/coins/200x200/23192.png',
    },
    rpcUri,
    publicRpcUri: rpcUri,
    safeAppsRpcUri: rpcUri,
    blockExplorerUriTemplate: {
        address: 'https://explorer.testnet.edexa.network/address/{{address}}',
        txHash: 'https://explorer.testnet.edexa.network/tx/{{txHash}}',
        api: 'https://explorer.testnet.edexa.network/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
    },
    features: [],
    ensRegistryAddress: '',
    contractAddresses: {
        safeSingletonAddress: null,
        safeProxyFactoryAddress: null,
        multiSendAddress: null,
        multiSendCallOnlyAddress: null,
        fallbackHandlerAddress: null,
        signMessageLibAddress: null,
        createCallAddress: null,
        simulateTxAccessorAddress: null,
        safeWebAuthnSignerFactoryAddress: null,
    },
    recommendedMasterCopyVersion: '1.4.1',
    theme: {
        textColor: '#ffffff',
        backgroundColor: '#B8AAD5',
    },
    balancesProvider: {
        chainName: null,
        enabled: false,
    },
    disabledWallets: [],
    gasPrice: [],
    transactionService: 'http://localhost:8000/txs',
}
