import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import LoginPage from './componentes/login/LoginPage';
import MyAppointmentsPage from './componentes/compromissos/compromissos';
import Navbar from './componentes/Navbar/Navbar'; 
import SignUpPage from './componentes/cadastro/cadastro';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate to="/login" replace />;
  };

  const handleMyAppointments = () => {
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} onMyAppointments={handleMyAppointments} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(https://images6.alphacoders.com/135/1350469.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px',
                  }}
                >
                  <Container maxWidth="xs">
                    <LoginPage onLogin={handleLogin} />
                  </Container>
                </Box>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/appointments"
          element={isLoggedIn ? <MyAppointmentsPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
