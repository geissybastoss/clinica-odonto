import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import HealthProfessionalForm from './HealthProfessionalForm';

const HealthProfessionalList = () => {
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Adicionar um novo profissional
  const handleAddProfessional = (professional) => {
    setProfessionals([
      ...professionals,
      { id: Date.now(), ...professional },
    ]);
  };

  // Editar profissional existente
  const handleEditProfessional = (updatedProfessional) => {
    setProfessionals(
      professionals.map((professional) =>
        professional.id === updatedProfessional.id
          ? updatedProfessional
          : professional
      )
    );
    setIsEditing(false);
    setSelectedProfessional(null);
  };

  // Excluir profissional
  const handleDeleteProfessional = (id) => {
    setProfessionals(professionals.filter((professional) => professional.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profissionais da Saúde
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedProfessional(null);
            setIsEditing(true);
          }}
          sx={{ mb: 2 }}
        >
          Adicionar Novo Profissional
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Especialidade</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {professionals.map((professional) => (
                <TableRow key={professional.id}>
                  <TableCell>{professional.name}</TableCell>
                  <TableCell>{professional.specialty}</TableCell>
                  <TableCell>{professional.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setSelectedProfessional(professional);
                        setIsEditing(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteProfessional(professional.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {isEditing && (
        <HealthProfessionalForm
          professional={selectedProfessional}
          onSave={
            selectedProfessional
              ? handleEditProfessional
              : handleAddProfessional
          }
          onCancel={() => setIsEditing(false)}
        />
      )}
    </Container>
  );
};

export default HealthProfessionalList;
