import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

const InsightsContainer = styled.div`
  padding: 25px;
  height: 100%;
  display: flex;
  border-radius: 7px;
  flex-direction: column;
  border: 1px solid #ffffff;
  background-color: #f0f4f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InsightsHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #34495e;
  text-align: center;
  margin-bottom: 20px;
`;

const InsightsText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #34495e;
  display: flex;
  align-items: center;
`;

const SparklineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f7f9fc;
  }
`;

const SparklineLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SparklineValue = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 5px;
`;

const ArrowIcon = styled.div`
  margin-left: 5px;
  font-size: 1.25rem;
  color: ${({ isPositive }) => (isPositive ? "#39ff14" : "#ff073a")};
`;

const PercentageChange = styled.span`
  font-size: 1rem;
  color: ${({ value }) => (value >= 0 ? "#39ff14" : "#ff073a")};
  margin-left: 5px;
  display: flex;
  align-items: center;
`;

const SparklineChart = styled.svg`
  width: 150px;
  height: 50px;
`;

function Insights() {
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [marketCapTrend, setMarketCapTrend] = useState([]);
  const [volumeTrend, setVolumeTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/global"
        );
        const data = response.data.data;
        setTotalMarketCap(data.total_market_cap.usd);
        setTotalVolume(data.total_volume.usd);

        const simulatedTrend = Array.from(
          { length: 30 },
          () => Math.random() * 1000 + 5000
        );
        setMarketCapTrend(simulatedTrend);
        setVolumeTrend(simulatedTrend.map((v) => v * 0.8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching global data:", error);
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  const calculatePercentageChange = (trendData) => {
    if (trendData.length < 2) return 0;
    const startValue = trendData[0];
    const endValue = trendData[trendData.length - 1];
    return ((endValue - startValue) / startValue) * 100;
  };

  const renderSparkline = (sparklineData) => {
    if (!sparklineData || sparklineData.length === 0) return null;

    const maxPrice = Math.max(...sparklineData);
    const minPrice = Math.min(...sparklineData);
    const width = 150;
    const height = 50;

    const points = sparklineData
      .map((price, index) => {
        const x = (index / (sparklineData.length - 1)) * width;
        const y = ((maxPrice - price) / (maxPrice - minPrice)) * height;
        return `${x},${y}`;
      })
      .join(" ");

    const trendColor =
      sparklineData[sparklineData.length - 1] > sparklineData[0]
        ? "#39ff14"
        : "#ff073a";

    return (
      <SparklineChart>
        <polyline
          fill="none"
          stroke={trendColor}
          strokeWidth="2"
          points={points}
        />
      </SparklineChart>
    );
  };

  const marketCapChange = calculatePercentageChange(marketCapTrend);
  const volumeChange = calculatePercentageChange(volumeTrend);

  return (
    <InsightsContainer>
      <InsightsHeading>Market Insights</InsightsHeading>
      {loading ? (
        <InsightsText>Loading market insights...</InsightsText>
      ) : (
        <>
          <SparklineContainer>
            <SparklineLabel>
              <InsightsText>
                Total Market Cap:
                <PercentageChange value={marketCapChange}>
                  {marketCapChange.toFixed(1)}%
                  <ArrowIcon isPositive={marketCapChange >= 0}>
                    {marketCapChange >= 0 ? (
                      <IoCaretUpSharp />
                    ) : (
                      <IoCaretDownSharp />
                    )}
                  </ArrowIcon>
                </PercentageChange>
              </InsightsText>
              <SparklineValue>
                ${totalMarketCap.toLocaleString()}
              </SparklineValue>
            </SparklineLabel>
            {renderSparkline(marketCapTrend)}
          </SparklineContainer>
          <SparklineContainer>
            <SparklineLabel>
              <InsightsText>
                Total Volume (24h):
                <PercentageChange value={volumeChange}>
                  {volumeChange.toFixed(1)}%
                  <ArrowIcon isPositive={volumeChange >= 0}>
                    {volumeChange >= 0 ? (
                      <IoCaretUpSharp />
                    ) : (
                      <IoCaretDownSharp />
                    )}
                  </ArrowIcon>
                </PercentageChange>
              </InsightsText>
              <SparklineValue>${totalVolume.toLocaleString()}</SparklineValue>
            </SparklineLabel>
            {renderSparkline(volumeTrend)}
          </SparklineContainer>
        </>
      )}
    </InsightsContainer>
  );
}

export default Insights;
