// src/pages/SettingsPage.js
import React from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SettingsTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const SettingsText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function SettingsPage() {
  return (
    <SettingsContainer>
      <SettingsTitle>Settings</SettingsTitle>
      <SettingsText>Manage your account settings and preferences.</SettingsText>
    </SettingsContainer>
  );
}

export default SettingsPage;
