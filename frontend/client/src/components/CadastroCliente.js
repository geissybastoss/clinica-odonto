import React, { useState } from 'react';
import axios from 'axios';

function CadastroCliente() {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    telefone: '',
    endereco: '',
    email: '',
    plano_saude: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/clientes', formData);
      alert('Cliente cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" placeholder="Nome" onChange={handleChange} />
      <input type="number" name="idade" placeholder="Idade" onChange={handleChange} />
      <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} />
      <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="plano_saude" placeholder="Plano de Saúde" onChange={handleChange} />
      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
}

export default CadastroCliente;
