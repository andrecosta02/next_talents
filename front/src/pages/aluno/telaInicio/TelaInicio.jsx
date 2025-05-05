import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./TelaInicio.css";

export default function TelaInicio() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <img src="/logo-nextTalents.png" alt="Nex.Talents Logo" className="logo" />
      </header>

      <main className="main">
        <div className="description">
          <i className="welcome">Seja bem-vindo(a)</i> à <strong>Next Talents</strong> uma plataforma conecta alunos criativos, escolas parceiras e empresas inovadoras em um só lugar. 
          <br />
          <br />
          Aqui, jovens desenvolvem projetos reais, recebem validação de instituições de ensino e conquistam oportunidades com empresas que valorizam o talento na prática.
        </div>

        <div className="cards">
          <div className="card" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            <img src="/aluno.png" alt="Aluno" className="card-image" />
            <span className="card-title">Aluno</span>
          </div>
          
          <div className="card" onClick={() => navigate("/desenvolvimento")} style={{ cursor: "pointer" }}>
            <img src="/instituicao.png" alt="Instituição de Ensino" className="card-image" />
            <span className="card-title">Instituição de Ensino</span>
          </div>

          <div className="card" onClick={() => navigate("/desenvolvimento")} style={{ cursor: "pointer" }}>
            <img src="/empresa.png" alt="Empresa Parceira" className="card-image" />
            <span className="card-title">Empresa Parceira</span>
          </div>
        </div>
      </main>


      <section className="how-it-works">
          <h3>Como funciona a plataforma?</h3>
          <div className="workflow">
            <div className="workflow-step">
              <strong>👩‍🎓 O aluno (Geração Z):</strong>
              <ul>
                <li>Se cadastra no sistema</li>
                <li>Cria um protótipo, projeto, solução ou produto</li>
                <li>Exemplos: campanha de marketing, modelo de app, proposta de inovação...</li>
              </ul>
            </div>
            <div className="workflow-step">
              <strong>🏫 A instituição de ensino:</strong>
              <ul>
                <li>Valida o que o aluno criou</li>
                <li>Fornece um selo ou certificado de qualidade</li>
                <li>Orienta e ajuda os alunos a evoluírem</li>
              </ul>
            </div>
            <div className="workflow-step">
              <strong>🏢 O RH / empresa:</strong>
              <ul>
                <li>Avalia os projetos e compra soluções prontas</li>
                <li>Contrata alunos para estágios ou demandas</li>
                <li>Lança desafios reais para os jovens resolverem</li>
              </ul>
            </div>
            <div className="workflow-step">
              <strong>💼 Os chefes:</strong>
              <ul>
                <li>Recebem talentos já testados e certificados</li>
                <li>Mentoram alunos ou lançam demandas reais</li>
              </ul>
            </div>
          </div>
        </section>
    </div>
  );
}
