// src/components/Overview.js
import React, { useReducer, useEffect, useState } from "react";
import styled from "styled-components";
import { IoCaretUpSharp, IoCaretDownSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";
import { fakeData } from "../data/fakeData"; // Import the fake data

const OverviewContainer = styled.div`
  padding: 25px;
  height: 100%;
  display: flex;
  border-radius: 7px;
  border: 1px solid #ffffff;
  flex-direction: column;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalValue = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChangeIndicator = styled.div`
  font-size: 1.2rem;
  color: ${({ isPositive }) => (isPositive ? "#27ae60" : "#e74c3c")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ArrowIcon = styled.div`
  margin: 0 5px;
  font-size: 1.25rem;
  color: ${({ isPositive }) => (isPositive ? "#27ae60" : "#e74c3c")};
`;

const EyeIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const SparklineChart = styled.svg`
  width: 150px;
  height: 50px;
  margin-top: 20px;
`;

const initialState = {
  totalHoldings: 0,
  previousTotal: 0,
  trendData: [], // Initialize as an empty array
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_HOLDINGS":
      return {
        ...state,
        previousTotal: state.totalHoldings,
        totalHoldings: action.payload,
        trendData: [...state.trendData, action.payload].slice(-30), // Keep last 30 data points
      };
    default:
      return state;
  }
}

function Overview() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isTotalVisible, setIsTotalVisible] = useState(true);

  useEffect(() => {
    const updateHoldings = () => {
      const newTotal = fakeData.assets.reduce(
        (acc, asset) => acc + asset.value,
        0
      );
      dispatch({ type: "UPDATE_HOLDINGS", payload: newTotal });
    };

    updateHoldings();

    const interval = setInterval(() => {
      const bitcoin = fakeData.assets.find((asset) => asset.name === "Bitcoin");
      if (bitcoin) {
        bitcoin.value += Math.floor(Math.random() * 2000 - 1000);
      }
      updateHoldings();
    }, 5000);

    return () => clearInterval(interval);
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
        ? "#27ae60"
        : "#e74c3c";

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

  const changeAmount = state.totalHoldings - state.previousTotal;
  const changePercentage =
    state.previousTotal !== 0
      ? ((changeAmount / state.previousTotal) * 100).toFixed(2)
      : 0;
  const isPositive = changeAmount >= 0;

  const toggleVisibility = () => {
    setIsTotalVisible(!isTotalVisible);
  };

  const formattedTotalHoldings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(state.totalHoldings);

  // Example usage of calculatePercentageChange
  const trendData = [100, 150, 200];
  const percentageChange = calculatePercentageChange(trendData);
  console.log("Percentage Change:", percentageChange);

  return (
    <OverviewContainer>
      <Title>
        Overview
        <EyeIcon onClick={toggleVisibility}>
          {isTotalVisible ? <FaEye /> : <GrFormViewHide />}
        </EyeIcon>
      </Title>
      <TotalValue>
        {isTotalVisible ? formattedTotalHoldings : "**********"}
      </TotalValue>
      <ChangeIndicator isPositive={isPositive}>
        {isPositive ? "+" : "-"}€
        {Math.abs(changeAmount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        <ArrowIcon isPositive={isPositive}>
          {isPositive ? <IoCaretUpSharp /> : <IoCaretDownSharp />}
        </ArrowIcon>
        {Math.abs(changePercentage)}% (24h)
      </ChangeIndicator>
      {renderSparkline(state.trendData)}
    </OverviewContainer>
  );
}

export default Overview;
