import React, { useState, useEffect, useRef } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import styled from "styled-components";
import MenuContent from "../components/MenuContent";
import ProfileContent from "../components/ProfileContent";
import DashboardPage from "./DashbordPage";
import PortfolioPage from "./PortfolioPage";
import MarketPage from "./MarketPage";
import LivePricing from "./LivePricing";
import NewsPage from "./NewsPage";
import SettingsPage from "./SettingsPage";
import WatchlistPage from "./WatchlistPage";
import ContactPage from "./ContactPage";
import LogoutPage from "./LogoutPage";
import TopBar from "./TopBar";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Footer = styled.footer`
  background: #0d1b2a;
  color: #e0e1dd;
  padding: 40px 20px;
  text-align: center;
  border-top: 2px solid #1b263b;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.5;
  position: relative;
  z-index: 10;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px 10px;
    font-size: 0.9rem;
  }
`;

const FooterLink = styled.a`
  color: #e0e1dd;
  text-decoration: none;
  margin: 8px 0;
  transition: color 0.3s;

  &:hover {
    color: #f4a261;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: #e0e1dd;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #f4a261;
  }
`;

const FooterText = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #a9a9a9;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 0.45;
  background-color: #e5e7eb;
  padding: 40px;
  padding-bottom: 15px;
  height: 100vh;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

const RightSection = styled.div`
  height: 100vh;
  flex: 2;
  background-color: #e5e7eb;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;

const Logo = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
`;

const IconWrapper = styled.div`
  font-size: 1.8rem;
`;

const ProfileSection = styled.div`
  background-color: #ffffff;
  padding: 2px;
  height: 20vh;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuSection = styled.div`
  background-color: #ffffff;
  padding: 2px;
  height: 70vh;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: auto;
  }
`;

function MainPage() {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const rightSectionRef = useRef(null);

  const handleScroll = () => {
    if (rightSectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = rightSectionRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    }
  };

  useEffect(() => {
    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.addEventListener("scroll", handleScroll);
      return () => rightSection.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const renderContent = () => {
    switch (selectedMenu) {
      case "Dashboard":
        return <DashboardPage />;
      case "Portfolio":
        return <PortfolioPage />;
      case "Market":
        return <MarketPage />;
      case "Live Pricing":
        return <LivePricing />;
      case "News":
        return <NewsPage />;
      case "Settings":
        return <SettingsPage />;
      case "Watchlist":
        return <WatchlistPage />;
      case "Contact Us":
        return <ContactPage />;
      case "Logout":
        return <LogoutPage />;
      default:
    }
  };

  return (
    <Container>
      <Main>
        <LeftSection>
          <Logo>
            <IconWrapper>
              <GiTakeMyMoney />
            </IconWrapper>
            <LogoText>CRIPTO</LogoText>
          </Logo>
          <ProfileSection>
            <ProfileContent />
          </ProfileSection>
          <MenuSection>
            <MenuContent setSelectedMenu={setSelectedMenu} />
          </MenuSection>
        </LeftSection>
        <RightSection ref={rightSectionRef}>
          <TopBar />
          {renderContent()}
        </RightSection>
      </Main>
      <Footer isVisible={isFooterVisible}>
        <div>© 2023 Your Cripto</div>
        <FooterLink href="https://yourcompany.com">
          Visit our website
        </FooterLink>
        <SocialIcons>
          <SocialIcon
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </SocialIcon>
          <SocialIcon
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </SocialIcon>
          <SocialIcon
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </SocialIcon>
        </SocialIcons>
        <FooterText>Crafted with care @ Robert</FooterText>
      </Footer>
    </Container>
  );
}

export default MainPage;
