// src/pages/PortfolioPage.js
import React from "react";
import styled from "styled-components";

const PortfolioContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PortfolioTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const PortfolioText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function PortfolioPage() {
  return (
    <PortfolioContainer>
      <PortfolioTitle>Portfolio</PortfolioTitle>
      <PortfolioText>
        Here is an overview of your portfolio. You can manage your assets and
        track performance.
      </PortfolioText>
      {/* Add more portfolio content here */}
    </PortfolioContainer>
  );
}

export default PortfolioPage;
