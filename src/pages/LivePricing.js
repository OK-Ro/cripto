import React from "react";
import styled from "styled-components";

const LivePricingContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LivePricingTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const LivePricingText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function LivePricing() {
  return (
    <LivePricingContainer>
      <LivePricingTitle>Live Pricing</LivePricingTitle>
      <LivePricingText>
        Get real-time pricing updates for your assets.
      </LivePricingText>
    </LivePricingContainer>
  );
}

export default LivePricing;
