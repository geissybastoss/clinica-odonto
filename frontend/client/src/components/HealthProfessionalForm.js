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

const HealthProfessionalForm = ({ professional, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
  });

  useEffect(() => {
    if (professional) {
      setFormData(professional);
    }
  }, [professional]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: professional?.id || Date.now() });
    setFormData({ name: '', specialty: '', email: '' });
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>
        {professional ? 'Editar Profissional' : 'Adicionar Profissional'}
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
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Especialidade"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
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

export default HealthProfessionalForm;
