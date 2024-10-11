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
  width: 70px;
  height: 70px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  margin-right: 16px;
  position: relative;
  background-image: url("https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg");
  background-size: cover;
  background-position: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ActiveIndicator = styled.div`
  width: 13px;
  height: 13px;
  background-color: #00ff00;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 20px;
  border: 2px solid #f3f4f6;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.9); /* Increased brightness and shadow */
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.9);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 30px rgba(0, 255, 0, 1);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.9);
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
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ProfileStatus = styled.span`
  margin: 30px 0 0;
  font-size: 0.8rem;
  color: #fff;
  background-color: #4caf50;
  padding: 4px 10px;
  border-radius: 10px;
  display: inline-block;
  font-weight: bold;
  border: 2px solid #ffffff;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  top: -5px;

  @media (max-width: 768px) {
    width: fit-content;
  }
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
