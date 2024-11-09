import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ClientList from './components/ClientList';
import HealthProfessionalList from './components/HealthProfessionalList';
import AppointmentList from './components/AppointmentList';

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/clientes" element={<ClientList />} />
        <Route path="/profissionais" element={<HealthProfessionalList />} />
        <Route path="/consultas" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
};

export default App;

