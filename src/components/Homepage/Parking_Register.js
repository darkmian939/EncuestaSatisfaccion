import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Register_Form.css';
import axios from '../../Api/Axiosconfig.js';

const Parkin_Register = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: 'admin'
  });
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');
  const navigate = useNavigate();

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await axios.get('/ping');
        if (response.status === 200) {
          setServerStatus('connected');
        } else {
          setServerStatus('disconnected');
          console.error('No se pudo conectar al servidor:', response.statusText);
        }
      } catch (error) {
        setServerStatus('disconnected');
        console.error('No se pudo conectar al servidor:', error.message);
      }
    };
    checkServerConnection();
  }, []);

  const handleCheckboxChange = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (serverStatus !== 'connected') {
      setError('No se puede conectar al servidor. Por favor, inténtalo de nuevo más tarde.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Verificar si el correo electrónico ya está registrado
    try {
      const emailExistsResponse = await axios.post('/api/user/check-account', { email: formData.email });
      const { userExists } = emailExistsResponse.data;
      if (userExists) {
        setError('Este correo electrónico ya está registrado');
        return;
      }
    } catch (error) {
      console.error('Error al verificar correo electrónico:', error.message);
      setError('Error al verificar correo electrónico. Inténtalo de nuevo más tarde.');
      return;
    }

    // Si el correo electrónico no está duplicado, proceder con el registro
    try {
      const response = await axios.post('/api/user', {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        tipoUsuario: formData.tipoUsuario
      });

      console.log('Usuario registrado:', response.data);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        tipoUsuario: 'admin'
      });
      setError('');
      alert('¡Usuario registrado exitosamente!');
      navigate('/establishment');
    } catch (error) {
      console.error('Error al registrar usuario:', error.response);
      if (error.response && error.response.status === 400) {
        setError('Error al registrar usuario: ' + error.response.data.error.join(', '));
      } else {
        setError('Error al registrar usuario. Inténtalo de nuevo más tarde.');
      }
    }
  };
  return (
    <div className='register-page'>
      <div className="page-container">
        <div className="register-container">
          <div className="register-header">
            <img src={require('../../assets/img/profile.png')} alt="Usuario" className="user-icon" />
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Regístrate</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-row">
              <label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repite la Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <select
                name="tipoUsuario"
                required
                value={formData.tipoUsuario}
                onChange={handleInputChange}
              >
                <option value="" disabled>Tipo de Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="terms-container">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={handleCheckboxChange}
              />
              <label>Acepto <Link to="/terminos_condiciones">términos y condiciones</Link></label>
            </div>
            <button type="submit" disabled={!acceptedTerms}>Registrar</button>
          </form>
          <p className="login-link">
            ¿Ya tienes cuenta? <Link to="/signin">Iniciar Sesión</Link>
          </p>
        </div>
        <img src={require('../../assets/img/carro prom.png')} alt="Decoración" className="decorative-icon" />
      </div>
    </div>
  );
}

export default Parkin_Register;
