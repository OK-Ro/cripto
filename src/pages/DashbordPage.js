import React from "react";
import styled from "styled-components";
import { fakeData } from "../data/fakeData";
import Overview from "../components/Overview";
import Cryptocurrencies from "../components/CryptoCurrencies";
import FearGreedIndex from "../components/FearGreedIndex";
import Insights from "../components/Insights";

const DashboardContainer = styled.div`
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const LargeSection = styled.div`
  grid-column: span 3;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: 35vh;
  border-radius: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const SubSection = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 3px solid #ffffff;
`;

const FullWidthSection = styled.div`
  grid-column: span 3;
  background-color: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
  height: 100vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 3px solid #ffffff;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    height: auto;
  }
`;

function DashboardPage() {
  return (
    <DashboardContainer>
      <LargeSection>
        <SubSection>
          <Overview totalHoldings={fakeData.total} assets={fakeData.assets} />
        </SubSection>
        <SubSection bgColor="#e8f5e9">
          <Insights />
        </SubSection>
        <SubSection>
          <FearGreedIndex />
        </SubSection>
      </LargeSection>

      <FullWidthSection>
        <Cryptocurrencies />
      </FullWidthSection>
    </DashboardContainer>
  );
}

export default DashboardPage;
