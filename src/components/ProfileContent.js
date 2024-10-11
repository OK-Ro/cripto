// src/components/ProfileContent.js
import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
  position: relative;
  background-image: url("https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg");
  background-size: cover;
  background-position: center;
  flex-shrink: 0; /* Prevent image from shrinking */
`;

const ActiveIndicator = styled.div`
  width: 12px;
  height: 12px;
  background-color: #4caf50;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 4px;
  border: 2px solid #f3f4f6;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 12px rgba(76, 175, 80, 0.8);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
    }
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

const ProfileName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
`;

const ProfileStatus = styled.p`
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: #777;
`;

function ProfileContent() {
  return (
    <ProfileContainer>
      <ProfileImage />
      <ActiveIndicator />
      <ProfileInfo>
        <ProfileName>Johnathan Alexander Doe</ProfileName>
        <ProfileStatus>Active</ProfileStatus>
      </ProfileInfo>
    </ProfileContainer>
  );
}

export default ProfileContent;
