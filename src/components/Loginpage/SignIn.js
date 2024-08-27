import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Api/Axiosconfig';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import '../../assets/css/Login_Styles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/auth', { email, password });

      console.log('Datos recibidos del servidor:', response.data);

      if (response.data.message === 'success') {
        const { userType, user } = response.data;

        // Almacenar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Tipo de usuario recibido:', userType);

        // Redireccionar según el tipo de usuario
        if (userType === 'admin') {
          navigate('/establishment');
        } else if (userType === 'client') {
          navigate('/reserve');
        } else {
          setError('Tipo de usuario desconocido');
        }
      } else {
        setError('Correo electrónico o contraseña inválidos');
      }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        setError('Error del servidor: ' + error.response.data.error);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor');
        setError('No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.');
      } else {
        console.error('Error durante la solicitud:', error.message);
        setError('Error durante la solicitud. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };


  return (
    <div className='body-login'>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className="form" noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="correo-electronico"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              className="textField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-password"
              className="textField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              Iniciar sesión
            </Button>
            <Grid container className="links-container">
              <Grid item xs={12}>
                <Link href="/reset" variant="body2" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <RouterLink to="/registerOptions" variant="body2" className="sign-up-link">
                  {"¿No tienes una cuenta? Regístrate"}
                </RouterLink>
              </Grid>
            </Grid>
          </form>  
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              Parkiando
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;
