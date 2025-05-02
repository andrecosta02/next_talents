import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import PopupMessage from "../../../components/PopupMessage";

import "./dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <div className="dashboard-container">
        <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
