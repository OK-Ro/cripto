// Extensive fake data representing a user's cryptocurrency holdings
export const fakeData = {
  assets: [
    { name: "Bitcoin", value: 150000 },
    { name: "Ethereum", value: 100000 },
    { name: "Binance Coin", value: 50000 },
    { name: "Cardano", value: 30000 },
    { name: "Solana", value: 2000 },
    { name: "Ripple", value: 20000 },
    { name: "Polkadot", value: 1000 },
    { name: "Dogecoin", value: 10000 },
    { name: "Litecoin", value: 8000 },
    { name: "Chainlink", value: 7000 },
    { name: "Stellar", value: 6000 },
    { name: "VeChain", value: 5000 },
    { name: "Tron", value: 4000 },
    { name: "Monero", value: 2000 },
    { name: "EOS", value: 1050 },
    { name: "IOTA", value: 506.2 },
  ],
};

// Calculate the total value of all holdings
fakeData.total = fakeData.assets.reduce((acc, asset) => acc + asset.value, 0);
