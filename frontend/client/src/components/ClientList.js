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
import ClientForm from './ClientForm';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddClient = (client) => {
    setClients([...clients, { id: Date.now(), ...client }]);
  };

  const handleEditClient = (updatedClient) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    setIsEditing(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Clientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedClient(null);
            setIsEditing(true);
          }}
          sx={{ mb: 2 }}
        >
          Adicionar Novo Cliente
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setSelectedClient(client);
                        setIsEditing(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClient(client.id)}
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
        <ClientForm
          client={selectedClient}
          onSave={selectedClient ? handleEditClient : handleAddClient}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </Container>
  );
};

export default ClientList;
