// src/components/CryptoList.js
import React, { useEffect, useState } from "react";

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Cryptocurrency Portfolio Tracker
      </h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Coin</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Market Cap</th>
            <th className="py-2 px-4 border-b">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((coin, index) => (
            <tr key={coin.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{coin.name}</td>
              <td className="py-2 px-4 border-b">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoList;
