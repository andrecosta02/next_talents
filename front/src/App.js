import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaInicio from './pages/aluno/telaInicio/TelaInicio';
import Register from './pages/aluno/telaCadastro/Register';
import TelaLogin from './pages/aluno/telaLogin/LoginPage';
import ConfirmaEmail from './pages/aluno/confirmaEmail/confirmaEmail';
import NovaSenhaPage from './pages/aluno/novaSenha/novaSenhaPage';
import Dashboard from './pages/aluno/dashboard/dashboard';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/reset-senha" element={<NovaSenhaPage />} />
        <Route path="/confirma-email" element={<ConfirmaEmail />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

