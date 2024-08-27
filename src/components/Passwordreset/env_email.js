import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Api/Axiosconfig'; // Asegúrate de importar Axios si no lo has hecho
import logo from '../../assets/img/loguito.png'; // Asegúrate de importar tu logo adecuadamente
import '../../assets/css/reset.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      // Realiza la solicitud POST al endpoint del backend
      const response = await axios.post('/api/user/send-email', { email });
      
      // Maneja la respuesta del servidor
      alert(response.data.message); // Muestra el mensaje de éxito al usuario

      // Puedes redirigir al usuario a otra página después de enviar el correo, si es necesario
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      alert('No se pudo enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <nav className="navbar-resetpassword">
        <Link to="/">
          <img src={logo} alt="Logo de Establecimiento" className="navbar-logo-resetpassword" />
        </Link>
        <div className="navbar-links-resetpassword">
          <Link to="/"><span>Inicio</span></Link>
          <Link to="/profile"><span>Perfil</span></Link>
        </div>
      </nav>

      <div className="container-resetpassword">
        <img src={logo} alt="Logo de la página" className="logo-resetpassword" />
        <h1 className="h1-resetpassword">Reestablecer Contraseña</h1>
        <p className="subtitle-resetpassword">Ingresa tu correo electrónico para reestablecer tu contraseña</p>
        <div className="form-group-resetpassword">
          <label className="label-resetpassword">Correo Electrónico</label>
          <input
            type="email"
            className="input-resetpassword"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="button-resetpassword" onClick={handleResetPassword}>
          Enviar Correo de Reestablecimiento
        </button>
      </div>
    </>
  );
};

export default ResetPasswordPage;
