import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: "San Francisco", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const Th = styled.th`
  background-color: #fff;
  color: #555;
  padding: 15px;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 500;
  border-bottom: 2px solid #e0e0e0;
`;

const Td = styled.td`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HiddenOnMobile = styled.th`
  @media (max-width: 768px) {
    display: none;
  }
`;

const HiddenTdOnMobile = styled(Td)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const PercentageChange = styled.span`
  color: ${({ value }) =>
    value >= 0 ? "#00ff00" : "#ff0000"}; /* Brighter green and red */
  font-weight: bold;
  font-size: 1rem; /* Increase font size for emphasis */
`;

const CryptoName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CryptoImage = styled.img`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 5px;
  }
`;

const CryptoText = styled.span`
  display: inline-block;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Dropdown = styled.select`
  padding: 8px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 6px;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  width: 200px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #e0e0e0;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    width: 100%;
  }
`;

function Cryptocurrencies() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [changeDisplayType, setChangeDisplayType] = useState("24h");
  const [volumeSorted, setVolumeSorted] = useState(false);
  const [chartDisplayType, setChartDisplayType] = useState("7d");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCryptos(data);
          setFilteredCryptos(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
    let updatedCryptos = [...cryptos];

    if (category !== "all") {
      const limit = parseInt(category, 10);
      updatedCryptos = updatedCryptos.slice(0, limit);
    }

    if (searchTerm) {
      updatedCryptos = updatedCryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCryptos(updatedCryptos);
  }, [cryptos, category, searchTerm]);

  const toggleVolumeSort = () => {
    if (volumeSorted) {
      setFilteredCryptos(cryptos);
    } else {
      const sortedCryptos = [...cryptos].sort(
        (a, b) => b.total_volume - a.total_volume
      );
      setFilteredCryptos(sortedCryptos);
    }
    setVolumeSorted(!volumeSorted);
  };

  const handleRowClick = (id) => {
    navigate(`/crypto/${id}`);
  };

  const renderDynamicContent = (crypto, type) => {
    switch (type) {
      case "1h":
        return (
          <PercentageChange
            value={crypto.price_change_percentage_1h_in_currency}
          >
            {crypto.price_change_percentage_1h_in_currency?.toFixed(2)}%
          </PercentageChange>
        );
      case "24h":
        return (
          <PercentageChange value={crypto.price_change_percentage_24h}>
            {crypto.price_change_percentage_24h?.toFixed(2)}%
          </PercentageChange>
        );
      case "7d":
        return (
          <PercentageChange
            value={crypto.price_change_percentage_7d_in_currency}
          >
            {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%
          </PercentageChange>
        );
      case "volume":
        return `$${crypto.total_volume.toLocaleString()}`;
      default:
        return null;
    }
  };

  const renderChartContent = (crypto, type) => {
    if (type === "7d") {
      return renderSparkline(crypto.sparkline_in_7d.price);
    }
    return null;
  };

  const renderSparkline = (sparklineData) => {
    if (!sparklineData || sparklineData.length === 0) return null;

    const maxPrice = Math.max(...sparklineData);
    const minPrice = Math.min(...sparklineData);
    const width = 100;
    const height = 30;

    const points = sparklineData
      .map((price, index) => {
        const x = (index / (sparklineData.length - 1)) * width;
        const y = ((maxPrice - price) / (maxPrice - minPrice)) * height;
        return `${x},${y}`;
      })
      .join(" ");

    const trendColor =
      sparklineData[sparklineData.length - 1] > sparklineData[0]
        ? "#00ff00" // Brighter green
        : "#ff0000"; // Brighter red

    return (
      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke={trendColor}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <Container>
      <div>
        <SearchInput
          type="text"
          placeholder="Search by name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dropdown
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Cryptos</option>
          <option value="10">Top 10</option>
          <option value="50">Top 50</option>
          <option value="100">Top 100</option>
        </Dropdown>
      </div>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <HiddenOnMobile>
              <Th>
                <Dropdown
                  value={changeDisplayType}
                  onChange={(e) => setChangeDisplayType(e.target.value)}
                >
                  <option value="1h">1H Change</option>
                  <option value="24h">24H Change</option>
                  <option value="7d">7D Change</option>
                </Dropdown>
              </Th>
            </HiddenOnMobile>
            <HiddenOnMobile>
              <Th>
                <Dropdown onChange={toggleVolumeSort}>
                  <option value="volume">24H Volume</option>
                </Dropdown>
              </Th>
            </HiddenOnMobile>
            <HiddenOnMobile>
              <Th>Market Cap</Th>
            </HiddenOnMobile>
            <Th>
              <Dropdown
                value={chartDisplayType}
                onChange={(e) => setChartDisplayType(e.target.value)}
              >
                <option value="1h">1H Chart</option>
                <option value="24h">24H Chart</option>
                <option value="7d">7D Chart</option>
              </Dropdown>
            </Th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((crypto, index) => (
            <tr
              key={crypto.id}
              onClick={() => handleRowClick(crypto.id)}
              style={{ cursor: "pointer" }}
            >
              <Td>{index + 1}</Td>
              <Td>
                <CryptoName>
                  <CryptoImage src={crypto.image} alt={`${crypto.name} logo`} />
                  <CryptoText>
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </CryptoText>
                </CryptoName>
              </Td>
              <Td>${crypto.current_price.toLocaleString()}</Td>
              <HiddenTdOnMobile>
                {renderDynamicContent(crypto, changeDisplayType)}
              </HiddenTdOnMobile>
              <HiddenTdOnMobile>
                {renderDynamicContent(crypto, "volume")}
              </HiddenTdOnMobile>
              <HiddenTdOnMobile>
                ${crypto.market_cap.toLocaleString()}
              </HiddenTdOnMobile>
              <Td>{renderChartContent(crypto, chartDisplayType)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Cryptocurrencies;
