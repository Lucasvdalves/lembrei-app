import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Event } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout, onMyAppointments }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    onLogout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#64b5f6' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Event sx={{ fontSize: 30, marginRight: '10px' }} />
        <Box sx={{ display: 'flex', gap: '15px' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#64b5f6', '&:hover': { backgroundColor: '#42a5f5' }, color: '#fff' }}
            onClick={onMyAppointments}
          >
            Meus Compromissos
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
