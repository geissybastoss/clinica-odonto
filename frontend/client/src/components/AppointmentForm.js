import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const AppointmentForm = ({ appointment, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    professionalName: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: appointment?.id || Date.now() });
    setFormData({ patientName: '', professionalName: '', date: '', time: '' });
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>
        {appointment ? 'Editar Consulta' : 'Nova Consulta'}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { my: 1, width: '100%' },
          }}
        >
          <TextField
            label="Paciente"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Profissional"
            name="professionalName"
            value={formData.professionalName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Data"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Horário"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;
