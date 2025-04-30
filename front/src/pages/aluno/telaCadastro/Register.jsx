import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    birth: "",
    pass: "",
    confirmPass: "",
    cpf: "",
    cep: "",
    city: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      last_name: "",
      email: "",
      birth: "",
      pass: "",
      confirmPass: "",
      cpf: "",
      cep: "",
      city: ""
    });
    setMessage("");
    setError("");
  };

  const formatBirth = (date) => date.replaceAll("-", "");
  const formatCPF = (cpf) => cpf.replace(/\D/g, "");
  const formatCEP = (cep) => cep.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.pass !== formData.confirmPass) {
      setError("As senhas não coincidem.");
      return;
    }

    const payload = {
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      birth: formatBirth(formData.birth),
      pass: formData.pass,
      cpf: formatCPF(formData.cpf),
      cep: formatCEP(formData.cep),
      city: formData.city
    };

    try {
      const res = await fetch("http://localhost:8080/nexttalents/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 201) {
        setMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
      } else if (res.status === 400 && data.errors) {
        setError(data.errors[0].msg);
      } else {
        setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <div className="input-row">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Sobrenome"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="birth"
          placeholder="Data de Nascimento"
          value={formData.birth}
          onChange={handleChange}
          required
        />

        <div className="input-row">
          <input
            type="password"
            name="pass"
            placeholder="Senha"
            value={formData.pass}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPass"
            placeholder="Confirmar Senha"
            value={formData.confirmPass}
            onChange={handleChange}
            required
          />
        </div>

        <InputMask
          mask="999.999.999-99"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        <InputMask
          mask="99999-999"
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="button-row">
          <button type="button" onClick={clearForm}>Limpar</button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
