import React from 'react';
import "./TelaInicio.css";

export default function TelaInicio() {
  return (
    <div className="container">
      <header className="header">
        <img src="/logo-nex-talents.png" alt="Nex.Talents Logo" className="logo" />
      </header>

      <main className="main">
        <h2 className="welcome">Seja bem-vindo(a)</h2>
        <p className="description">
          à Next Talents, a melhor plataforma de banco de conhecimentos, com Cursos <span className="highlight">ATUALIZADOS</span> e atuais para o mercado de trabalho
        </p>

        <div className="cards">
          <div className="card">
            <img src="/aluno.png" alt="Aluno" className="card-image" />
            <span className="card-title">Aluno</span>
          </div>

          <div className="card">
            <img src="/instituicao.png" alt="Instituição de Ensino" className="card-image" />
            <span className="card-title">Instituição de Ensino</span>
          </div>

          <div className="card">
            <img src="/empresa.png" alt="Empresa Parceira" className="card-image" />
            <span className="card-title">Empresa Parceira</span>
          </div>
        </div>
      </main>
    </div>
  );
}
