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
import AppointmentForm from './AppointmentForm';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddAppointment = (appointment) => {
    setAppointments([...appointments, { id: Date.now(), ...appointment }]);
  };

  const handleEditAppointment = (updatedAppointment) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      )
    );
    setIsEditing(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agendamento de Consultas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedAppointment(null);
            setIsEditing(true);
          }}
          sx={{ mb: 2 }}
        >
          Nova Consulta
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Profissional</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Horário</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.professionalName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsEditing(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteAppointment(appointment.id)}
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
        <AppointmentForm
          appointment={selectedAppointment}
          onSave={
            selectedAppointment
              ? handleEditAppointment
              : handleAddAppointment
          }
          onCancel={() => setIsEditing(false)}
        />
      )}
    </Container>
  );
};

export default AppointmentList;
