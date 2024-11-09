import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Clínica Odonto
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/clientes">
            Clientes
          </Button>
          <Button color="inherit" component={Link} to="/profissionais">
            Profissionais da Saúde
          </Button>
          <Button color="inherit" component={Link} to="/consultas">
            Consultas
        </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
