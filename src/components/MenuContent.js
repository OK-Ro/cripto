// src/components/MenuContent.js
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: relative;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    background-color: rgba(243, 244, 246, 0.95);
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    padding: 20px;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const MenuItem = styled.li`
  padding: 12px 16px;
  background-color: #f3f4f6;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const Hamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: -16rem;
    right: 10px;
    width: 30px;
    height: 30px;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    z-index: 2;

    div {
      width: 100%;
      height: 4px;
      background-color: #333;
      transition: all 0.3s;
    }
  }
`;

const CloseButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: -16rem;
    right: 10px;
    font-size: 40px;
    cursor: pointer;
    z-index: 2;
  }
`;

function MenuContent({ setSelectedMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Dashboard",
    "Portfolio",
    "Market",
    "Live Pricing",
    "News",
    "Settings",
    "Watchlist",
    "Contact Us",
    "Logout",
  ];

  return (
    <MenuContainer>
      {isOpen ? (
        <CloseButton onClick={() => setIsOpen(false)}>
          <IoCloseCircle />
        </CloseButton>
      ) : (
        <Hamburger onClick={() => setIsOpen(true)}>
          <div />
          <div />
          <div />
        </Hamburger>
      )}
      <MenuList isOpen={isOpen}>
        {menuItems.map((item) => (
          <MenuItem key={item} onClick={() => setSelectedMenu(item)}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  );
}

export default MenuContent;
