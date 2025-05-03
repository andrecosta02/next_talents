import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopupMessage from "../../../components/PopupMessage";
import { getLoggedUser } from "../../../utils/auth";

const Dashboard = () => {
  const user = getLoggedUser();

  useEffect(() => {
    if (user) {
      console.log("Usuário logado:", user.name);
    }
  }, []);

  return (
    <>
      <h2>Bem-vindo(a), {user?.name}</h2>
      {/* conteúdo da dashboard */}
    </>
  );
};

export default Dashboard;
