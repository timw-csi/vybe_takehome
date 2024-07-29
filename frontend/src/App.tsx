import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PieChart from "./components/charts/PieChart";
import TimeSeriesChart from "./components/charts/TimeSeriesChart";
import BarChart from "./components/charts/BarChart";
import Navbar from "./components/layout/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<h1>Solana Dashboard</h1>} />
            <Route path="/marketCap" element={<PieChart />} />
            <Route path="/tps" element={<TimeSeriesChart />} />
            <Route path="/balances" element={<BarChart />} />
            <Route path="*" element={<h1>404 - Nothing to See Here</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
