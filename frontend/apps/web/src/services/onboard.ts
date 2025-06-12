import Onboard, { type OnboardAPI } from '@web3-onboard/core'
import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import { getRpcServiceUrl } from '@/hooks/wallets/web3'
import type { EnvState } from '@/store/settingsSlice'
import { numberToHex } from '@/utils/hex'
import { BRAND_NAME } from '@/config/constants'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'

let onboard: OnboardAPI | null = null

export const createOnboard = (
  chainConfigs: ChainInfo[],
  currentChain: ChainInfo,
  rpcConfig: EnvState['rpc'] | undefined,
): OnboardAPI => {
  if (onboard) return onboard
  // console.log("test 1")

  // const wallets = getAllWallets(currentChain)

  const chains = chainConfigs.map((cfg) => ({
    // We cannot use ethers' toBeHex here as we do not want to pad it to an even number of characters.
    id: numberToHex(parseInt(cfg.chainId)),
    label: cfg.chainName,
    rpcUrl: rpcConfig?.[cfg.chainId] || getRpcServiceUrl(cfg.rpcUri),
    token: cfg.nativeCurrency.symbol,
    color: cfg.theme.backgroundColor,
    publicRpcUrl: cfg.publicRpcUri.value,
    blockExplorerUrl: new URL(cfg.blockExplorerUriTemplate.address).origin,
  }))

  const injected = injectedModule({
    custom: [
      // include custom injected wallet modules here
    ],
    filter: {
      // mapping of wallet labels to filter here
    },
  })

  const walletConnect = walletConnectModule({
    version: 2,
    // Replace with your apiKey
    projectId: '4a49c32131502e8c12d54295295e2012',
    dappUrl: 'https://onboard.blocknative.com/',
  })

  onboard = Onboard({
    wallets: [injected, walletConnect],

    chains: [
      ...chains,

      // {
      //   id: numberToHex(parseInt('1995')),
      //   label: 'edexa',
      //   rpcUrl: 'https://rpc.testnet.edexa.com',
      //   token: 'EDX',
      //   color: '#3B82F6',
      //   publicRpcUrl: 'https://rpc.testnet.edexa.com',
      //   blockExplorerUrl: new URL('https://explorer.testnet.edexa.network').origin,
      // },
      {
        id: numberToHex(parseInt('73799')),
        label: 'Volta',
        rpcUrl: 'https://volta-rpc.energyweb.org',
        token: 'VT',
        color: '#514989',
        publicRpcUrl: 'https://volta-rpc.energyweb.org',
        blockExplorerUrl: new URL('https://volta-explorer.energyweb.org').origin,
      },
    ],

    accountCenter: {
      mobile: { enabled: false },
      desktop: { enabled: true },
    },

    notify: {
      enabled: false,
    },

    appMetadata: {
      name: BRAND_NAME,
      icon: location.origin + '/images/logo-round.svg',
      description: `${BRAND_NAME} – smart contract wallet for Ethereum (ex-Gnosis Safe multisig)`,
    },

    connect: {
      removeWhereIsMyWalletWarning: true,
      autoConnectLastWallet: false,
    },
  })

  return onboard
}
