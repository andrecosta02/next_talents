import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaInicio from './pages/aluno/telaInicio/TelaInicio';
import Register from './pages/aluno/telaCadastro/Register';
import TelaLogin from './pages/aluno/telaLogin/LoginPage';
import ConfirmaEmail from './pages/aluno/confirmaEmail/confirmaEmail';
import NovaSenhaPage from './pages/aluno/novaSenha/novaSenhaPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/confirma-email" element={<ConfirmaEmail />} />
        <Route path="/novaSenha" element={<NovaSenhaPage />} />

      </Routes>
    </Router>
  );
}

export default App;
