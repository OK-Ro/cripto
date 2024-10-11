import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DashboardPage from "./pages/DashbordPage";
import PortfolioPage from "./pages/PortfolioPage";
import LogoutPage from "./pages/LogoutPage";
import WatchlistPage from "./pages/WatchlistPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import NewsPage from "./pages/NewsPage";
import MarketPage from "./pages/MarketPage";
import LivePricing from "./pages/LivePricing";
import Cryptocurrencies from "./components/CryptoCurrencies";

import CryptoOverview from "./components/CryptoOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/live-pricing" element={<LivePricing />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/crypto/:id" element={<CryptoOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
