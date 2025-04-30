import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaInicio from './pages/aluno/telaInicio/TelaInicio';
import Register from './pages/aluno/telaCadastro/Register';
import ConfirmaEmail from './pages/aluno/confirmaEmail/confirmaEmail';

function App() {
  return (
    // <div>
    //   <TelaInicio />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirma-email" element={<ConfirmaEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
