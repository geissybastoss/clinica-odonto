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

const ClientForm = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (client) {
      setFormData(client);
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: client?.id || Date.now() });
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>{client ? 'Editar Cliente' : 'Adicionar Cliente'}</DialogTitle>
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Telefone"
            name="phone"
            value={formData.phone}
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

export default ClientForm;
