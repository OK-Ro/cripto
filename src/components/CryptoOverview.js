import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const OverviewContainer = styled.div`
  padding: 40px;
  background: linear-gradient(135deg, #f0f2f5, #e0e7ff);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  max-width: 1100px;
  margin: 60px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 30px auto;
  }
`;

const StyledTitle = styled.h2`
  margin-bottom: 40px;
  font-size: 3rem;
  color: #1c1c1e;
  text-align: center;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Detail = styled.div`
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: #3a3a3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 15px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #1c1c1e;
  margin-left: 10px;
  border-bottom: 3px solid #e5e5ea;
  padding-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #3a3a3c;
  line-height: 1.8;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 15px;
  }
`;

const Link = styled.a`
  color: #007aff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: #005bb5;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  font-size: 1.1rem;
  color: #ffffff;
  background-color: #ff6b6b;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #e63946;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

const ChartContainer = styled.div`
  height: 600px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    height: 400px;
    padding: 15px;
  }
`;

const NewsContainer = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const NewsHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const NewsCompanyName = styled.h1`
  font-size: 2.5rem;
  color: #1c1c1e;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NewsItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e5ea;
  padding-bottom: 30px;
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NewsImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 250px;
    height: 150px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const NewsContent = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const NewsTitle = styled.h4`
  font-size: 1rem;
  color: #1c1c1e;
  margin: 0 0 10px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NewsDescription = styled.p`
  font-size: 0.8rem;
  color: #555;
  font-weight: 500;
  margin: 0 0 10px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const NewsSource = styled.small`
  color: gray;
  font-size: 0.5rem;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 0.4rem;
  }
`;

const PriceChange = styled.span`
  color: ${({ isPositive }) => (isPositive ? "#4caf50" : "#f44336")};
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const NewsWord = styled.span`
  color: #ff4500;
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  display: inline-block;
  margin-left: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border-bottom: 5px solid #ff4500;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

function CryptoOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch crypto data");
        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?categories=${id.toUpperCase()}`
        );
        if (!response.ok) throw new Error("Failed to fetch news data");
        const newsData = await response.json();
        console.log("News data:", newsData);
        setNews(newsData.Data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchCrypto();
    fetchNews();
  }, [id]);

  if (loading) return <OverviewContainer>Loading...</OverviewContainer>;

  if (error)
    return <OverviewContainer>Error loading data: {error}</OverviewContainer>;

  if (!crypto) return <OverviewContainer>No data available.</OverviewContainer>;

  const priceChange = crypto.market_data.price_change_percentage_24h || 0;
  const marketCapChange =
    crypto.market_data.market_cap_change_percentage_24h || 0;
  const volumeChange = crypto.market_data.total_volume_change_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <OverviewContainer>
      <BackButton onClick={() => navigate("/")}>Back</BackButton>
      <StyledTitle>
        <img
          src={crypto.image.small}
          alt={`${crypto.name} icon`}
          style={{ marginRight: "10px", verticalAlign: "middle" }}
        />
        {crypto.name} Overview
      </StyledTitle>
      <Detail>
        <span>Current Price:</span>
        <span>
          €{crypto.market_data.current_price.eur?.toLocaleString() || "N/A"}{" "}
          <PriceChange isPositive={isPositive}>
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            {priceChange.toFixed(2)}% (1d)
          </PriceChange>
        </span>
      </Detail>
      <Detail>
        <span>Market Cap:</span>
        <span>
          €{crypto.market_data.market_cap.eur?.toLocaleString() || "N/A"}{" "}
          <PriceChange isPositive={marketCapChange >= 0}>
            {marketCapChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {marketCapChange.toFixed(2)}%
          </PriceChange>
        </span>
      </Detail>
      <Detail>
        <span>Volume (24h):</span>
        <span>
          €{crypto.market_data.total_volume.eur?.toLocaleString() || "N/A"}{" "}
          <PriceChange isPositive={volumeChange >= 0}>
            {volumeChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {volumeChange.toFixed(2)}%
          </PriceChange>
        </span>
      </Detail>
      <Detail>
        <span>FDV:</span>
        <span>
          €
          {crypto.market_data.fully_diluted_valuation.eur?.toLocaleString() ||
            "N/A"}
        </span>
      </Detail>
      <Detail>
        <span>Vol/Mkt Cap (24h):</span>
        <span>
          {crypto.market_data.total_volume.eur &&
          crypto.market_data.market_cap.eur
            ? (
                (crypto.market_data.total_volume.eur /
                  crypto.market_data.market_cap.eur) *
                100
              ).toFixed(2)
            : "N/A"}
          %
        </span>
      </Detail>
      <Detail>
        <span>Total Supply:</span>
        <span>
          {crypto.market_data.total_supply?.toLocaleString() || "N/A"} BTC
        </span>
      </Detail>
      <Detail>
        <span>Max Supply:</span>
        <span>
          {crypto.market_data.max_supply?.toLocaleString() || "N/A"} BTC
        </span>
      </Detail>
      <Detail>
        <span>Circulating Supply:</span>
        <span>
          {crypto.market_data.circulating_supply?.toLocaleString() || "N/A"} BTC
        </span>
      </Detail>

      <ChartContainer>
        <SectionTitle>Price Chart</SectionTitle>
        <AdvancedRealTimeChart
          symbol={`BINANCE:${crypto.symbol.toUpperCase()}USDT`}
          theme="light"
          autosize
          style={{ width: "100%", height: "100%" }}
          hide_side_toolbar={false}
          allow_symbol_change={false}
        />
      </ChartContainer>

      <SectionTitle>Description</SectionTitle>
      <Description
        dangerouslySetInnerHTML={{ __html: crypto.description.en }}
      />

      <SectionTitle>Links</SectionTitle>
      <Detail>
        <Link
          href={crypto.links.homepage[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Website
        </Link>
      </Detail>
      <Detail>
        <Link
          href={crypto.links.blockchain_site[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Blockchain Explorer
        </Link>
      </Detail>

      <NewsContainer>
        <NewsHeader>
          <NewsCompanyName>
            {crypto.name}
            <NewsWord>News</NewsWord>
          </NewsCompanyName>
        </NewsHeader>
        {news.length > 0 ? (
          news.map((article, index) => (
            <NewsItem key={index}>
              <NewsImage src={article.imageurl} alt="Article" />
              <NewsContent>
                <NewsTitle>
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </Link>
                </NewsTitle>
                <NewsDescription>{article.body}</NewsDescription>
                <NewsSource>
                  {article.source_info.name} -{" "}
                  {new Date(article.published_on * 1000).toLocaleDateString()}
                </NewsSource>
              </NewsContent>
            </NewsItem>
          ))
        ) : (
          <p>No news available for this cryptocurrency.</p>
        )}
      </NewsContainer>
    </OverviewContainer>
  );
}

export default CryptoOverview;
