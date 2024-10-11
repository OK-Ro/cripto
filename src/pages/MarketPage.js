// src/pages/MarketPage.js
import React from "react";
import styled from "styled-components";

const MarketContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MarketTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const MarketText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function MarketPage() {
  return (
    <MarketContainer>
      <MarketTitle>Market</MarketTitle>
      <MarketText>Explore the latest market trends and data.</MarketText>
    </MarketContainer>
  );
}

export default MarketPage;
