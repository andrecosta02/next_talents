
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../../utils/auth";
import "./dashboard.css";

const Dashboard = () => {
  const user = getLoggedUser();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("sobre");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "sobre":
        return <div><h2>Sobre Mim</h2><p>Informações do aluno para empresas (bio, experiências, etc.).</p></div>;
      case "meus":
        return <div><h2>Meus Projetos</h2><p>Seus projetos listados aqui.</p></div>;
      case "geral":
        return <div><h2>Projetos Geral</h2><p>Todos os projetos públicos.</p></div>;
      case "instituicoes":
        return <div><h2>Instituições</h2><p>Lista de instituições e projetos validados.</p></div>;
      case "empresas":
        return <div><h2>Empresas</h2><p>Empresas disponíveis no sistema.</p></div>;
      case "perfil":
        return <div><h2>Meu Perfil</h2><p>Editar informações de cadastro do usuário.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img
          src="/logo-nextTalents.png"
          alt="Logo"
          className="dashboard-logo"
        />
        <div className="dashboard-actions">
          <button onClick={() => setSelectedMenu("perfil")} title="Meu Perfil">👤</button>
          <button onClick={handleLogout} title="Sair">🚪</button>
        </div>
      </header>

      <div className={`dashboard-menu ${menuOpen ? "open" : ""}`}>
        {/* <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button> */}

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="icon">☰</span>
          <span className="text">Fechar</span>
        </button>

        <button className="menu-item" onClick={() => setSelectedMenu("sobre")}>
          <span className="icon">📄</span>
          <span className="text">Sobre Mim</span>
        </button>
        <button className="menu-item" onClick={() => setSelectedMenu("meus")}>
          <span className="icon">📁</span>
          <span className="text">Meus Projetos</span>
        </button>
        <button className="menu-item" onClick={() => setSelectedMenu("geral")}>
          <span className="icon">🌐</span>
          <span className="text">Projetos Geral</span>
        </button>
        <button className="menu-item" onClick={() => setSelectedMenu("instituicoes")}>
          <span className="icon">🏛️</span>
          <span className="text">Instituições</span>
        </button>
        <button className="menu-item" onClick={() => setSelectedMenu("empresas")}>
          <span className="icon">🏢</span>
          <span className="text">Empresas</span>
        </button>
      </div>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
