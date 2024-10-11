// src/pages/LogoutPage.js
import React from "react";
import styled from "styled-components";

const LogoutContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoutTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const LogoutText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function LogoutPage() {
  return (
    <LogoutContainer>
      <LogoutTitle>Logout</LogoutTitle>
      <LogoutText>You have been logged out. See you next time!</LogoutText>
    </LogoutContainer>
  );
}

export default LogoutPage;
