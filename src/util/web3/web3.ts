export const config = {
  chainParameters: process.env.CHAIN_PARAMETERS
    ? JSON.parse(process.env.CHAIN_PARAMETERS)
    : {
        id: 1666600000, // '0x63564C40'
        name: "Harmony Mainnet Shard 0",
        network: "harmony",
        nativeCurrency: {
          decimals: 18,
          name: "ONE",
          symbol: "ONE",
        },
        rpcUrls: {
          default: "https://api.harmony.one",
        },
        blockExplorers: {
          default: { name: "Explorer", url: "https://explorer.harmony.one/" },
        },
        testnet: true,
      },
};
