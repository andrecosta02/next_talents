import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaInicio from './pages/aluno/telaInicio/TelaInicio';
import Register from './pages/aluno/telaCadastro/Register';
import TelaLogin from './pages/telaLogin/LoginPage';

function App() {
  return (
    // <div>
    //   <TelaInicio />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<TelaLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
