// src/components/FearGreedIndex.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GaugeContainer = styled.div`
  padding: 25px;
  height: 100%;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  background-color: #f8f9fa;
  border: 1px solid #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 1rem;
  font-weight: 900;
  color: #2c3e50;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const GaugeLabel = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LabelText = styled.span`
  font-weight: bold;
  color: #34495e;
`;

const IndexValue = styled.span`
  font-size: 1.2rem;
  font-weight: 900;
  color: ${(props) => props.color};
`;

function FearGreedIndex() {
  const [indexValue, setIndexValue] = useState(null);
  const colors = ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff"];
  const labels = ["Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed"];

  useEffect(() => {
    // Fetch the data from Alternative.me API
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.alternative.me/fng/");
        const data = await response.json();
        const value = parseInt(data.data[0].value, 10); // Get the current index value
        setIndexValue(value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getColorAndLabel = (value) => {
    if (value <= 20) return { color: colors[0], label: labels[0] };
    if (value <= 40) return { color: colors[1], label: labels[1] };
    if (value <= 60) return { color: colors[2], label: labels[2] };
    if (value <= 80) return { color: colors[3], label: labels[3] };
    return { color: colors[4], label: labels[4] };
  };

  const { color, label } =
    indexValue !== null
      ? getColorAndLabel(indexValue)
      : { color: "#ccc", label: "Loading..." };
  const rotation = indexValue !== null ? (indexValue / 100) * 180 - 90 : 0; // Adjust rotation to start from -90 degrees

  return (
    <GaugeContainer>
      <Heading>Fear and Greed Index</Heading>
      <svg width="230" height="130" viewBox="0 0 300 150">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: colors[0], stopOpacity: 1 }}
            />
            <stop
              offset="25%"
              style={{ stopColor: colors[1], stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: colors[2], stopOpacity: 1 }}
            />
            <stop
              offset="75%"
              style={{ stopColor: colors[3], stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: colors[4], stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M 20 130 A 110 110 0 0 1 280 130"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="15"
        />
        <polygon
          points="150,130 145,100 155,30"
          fill={color}
          transform={`rotate(${rotation} 150 130)`}
        />
        <circle cx="150" cy="130" r="8" fill={color} />

        {/* Position 0 and 100 just inside the circle */}
        <text
          x="40"
          y="125"
          textAnchor="middle"
          fontSize="12"
          fill="#2c3e50"
          fontWeight="bold"
        >
          0
        </text>
        <text
          x="260"
          y="125"
          textAnchor="middle"
          fontSize="12"
          fill="#2c3e50"
          fontWeight="bold"
        >
          100
        </text>
      </svg>
      <GaugeLabel>
        <LabelText>{label}</LabelText>
        <IndexValue color={color}>
          {indexValue !== null ? indexValue : "Loading..."}
        </IndexValue>
      </GaugeLabel>
    </GaugeContainer>
  );
}

export default FearGreedIndex;
