import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();
  const [formData] = useState({
      email: ""
    });
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/nexttalents/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMensagem('Login realizado com sucesso!');
      } else {
        setMensagem(data.mensagem || 'Erro no login.');
      }
    } catch (err) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  const handleForgtPass = async () => {
    try {
      const response = await fetch('http://localhost:8080/nexttalents/student/forgot-pass ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMensagem('se existir cadastro um email sera enviado');
      } else {
        setMensagem('Erro no envio do email.');
      }
    } catch (err) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="login-container">
    <img src="/logo-nex-talents.png" alt="Nex.Talents" className="logo" />
      <div className="login-box">
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          placeholder="seunome@email.com"
          value={formData.email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          placeholder="********"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Acessar</button>
        <div className="cadastro" onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
        <p className="cadastro">Não possui login?</p>
          </div>
        <p className="esqueciSenha" onClick={handleForgtPass}>Esqueceu a senha?</p>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
};

export default LoginPage;