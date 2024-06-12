import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backgroundImageUrl = 'https://images6.alphacoders.com/135/1350469.png';
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { email, password });
      console.log('Login bem-sucedido:', response.data);
      // Adicione aqui a lógica para redirecionar para a página correta após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    console.log('Redirecionar para a página de recuperação de senha');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '8px',
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontFamily: 'cursive', 
          fontSize: '48px',
          color: 'white', 
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          textAlign: 'center',
          padding: '0 10px'
        }}
      >
        Preparamos com carinho do seu dia!
      </Typography>
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '30px', 
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.9)',
            textAlign: 'center',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Senha"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#64b5f6', 
                    '&:hover': { backgroundColor: '#42a5f5' }, 
                    color: '#fff' 
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#64b5f6', 
                    '&:hover': { backgroundColor: '#42a5f5' }, 
                    color: '#fff' 
                  }} 
                  onClick={handleSignup}
                >
                  Cadastre-se
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="text" color="primary" onClick={handleForgotPassword}>
                  Recuperar senha
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
