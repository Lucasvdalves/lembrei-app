import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar, Container } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    idade: '',
    telefone:'',
    email: '',
    senha: '',
    confirmarSenha: '',

  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      setAlertSeverity('error');
      setAlertMessage('As senhas não correspondem.');
      setAlertOpen(true);
      return;
    }
    if (!/[A-Z]/.test(formData.senha)) {
      setAlertSeverity('error');
      setAlertMessage('A senha deve conter pelo menos uma letra maiúscula.');
      setAlertOpen(true);
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/users/signup', formData);
      setAlertSeverity('success');
      setAlertMessage('Usuário cadastrado com sucesso!');
      setAlertOpen(true);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setAlertSeverity('error');
      setAlertMessage('Erro ao cadastrar usuário. Por favor, tente novamente.');
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        backgroundImage: 'url(https://images6.alphacoders.com/133/1332721.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        padding: '8px',
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: 1,
          textAlign: 'center',
          border: '2px solid #ccc', 
        }}
      >
        <Typography variant="h4" gutterBottom fontFamily={'cursive'}>
          Não perca mais tempo, Cadastre-se
        </Typography>
      
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="nome"
            label="Nome"
            variant="outlined"
            margin="normal"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="sobrenome"
            label="Sobrenome"
            variant="outlined"
            margin="normal"
            value={formData.sobrenome}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="number"
            name="idade"
            label="Idade"
            variant="outlined"
            margin="normal"
            value={formData.idade}
            onChange={handleChange}
            required
          />

<TextField
            fullWidth
            name="telefone"
            label="telefone"
            variant="outlined"
            margin="normal"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            type="email"
            name="email"
            label="E-mail"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="password"
            name="senha"
            label="Senha"
            variant="outlined"
            margin="normal"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="password"
            name="confirmarSenha"
            label="Confirmar Senha"
            variant="outlined"
            margin="normal"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Cadastrar
          </Button>
        </form>
      </Container>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
          {alertSeverity === 'success' && (
            <Button component={Link} to="/login" color="inherit" size="small">
              Clique para Fazer o Login
            </Button>
          )}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
