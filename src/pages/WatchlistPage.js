// src/pages/WatchlistPage.js
import React from "react";
import styled from "styled-components";

const WatchlistContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WatchlistTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const WatchlistText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function WatchlistPage() {
  return (
    <WatchlistContainer>
      <WatchlistTitle>Watchlist</WatchlistTitle>
      <WatchlistText>
        Track your favorite assets and monitor their performance.
      </WatchlistText>
      {/* Add more watchlist content here */}
    </WatchlistContainer>
  );
}

export default WatchlistPage;
