import React, { useState } from "react";
import styled from "styled-components";

import { FiSearch } from "react-icons/fi";
import { IoNotifications, IoNotificationsOff } from "react-icons/io5";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 4px;
  border-radius: 16px;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 18px;
  padding: 8px 16px;
  flex: 1;
  margin-right: 20px;
  cursor: pointer;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  margin-left: 8px;
  flex: 1;
  color: #333;
  font-size: 1rem;
  &::placeholder {
    color: #888;
  }
`;

const NotificationIcon = styled.div`
  position: relative;
  font-size: 1.5rem;
  margin-right: 20px;
  cursor: pointer;
  color: #1e3a8a;
  transition: color 0.3s;

  &:hover {
    color: #3b82f6;
  }
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #ff0000;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const ConnectButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  border: 3px solid #ffffff;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
`;

function TopBar() {
  const [activeModal, setActiveModal] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(true);

  const handleSearchClick = () => setActiveModal("search");
  const handleNotificationClick = () => {
    setActiveModal("notifications");
    setHasNotifications(false);
  };
  const handleConnectClick = () => setActiveModal("connect");

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <TopBarContainer>
        <SearchBar onClick={handleSearchClick}>
          <FiSearch />
          <SearchInput type="text" placeholder="Search crypto..." readOnly />
        </SearchBar>
        <NotificationIcon onClick={handleNotificationClick}>
          {hasNotifications ? <IoNotifications /> : <IoNotificationsOff />}
          <NotificationDot show={hasNotifications} />
        </NotificationIcon>
        <ConnectButton onClick={handleConnectClick}>
          Connect Wallet
        </ConnectButton>
      </TopBarContainer>

      {activeModal && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {activeModal === "search" && <div>Search Page Content</div>}
            {activeModal === "notifications" && (
              <div>Notifications Page Content</div>
            )}
            {activeModal === "connect" && (
              <div>Connect Wallet Page Content</div>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default TopBar;
