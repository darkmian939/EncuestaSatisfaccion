import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Api/Axiosconfig'; // Asegúrate de importar Axios si no lo has hecho
import logo from '../../assets/img/loguito.png'; // Asegúrate de importar tu logo adecuadamente
import '../../assets/css/reset.css';

const ResetPasswordPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.');
      return;
    }

    try {
      // Realiza la solicitud POST al endpoint del backend
      const response = await axios.post('/api/user/reset-password', { identifier, newPassword });
      
      // Maneja la respuesta del servidor
      alert(response.data.message); // Muestra el mensaje de éxito al usuario

      // Puedes redirigir al usuario a otra página después de restablecer la contraseña, si es necesario
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      alert('No se pudo restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.');
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
        <p className="subtitle-resetpassword">Ingresa tu correo electrónico o nombre de usuario y tu nueva contraseña para restablecer tu cuenta</p>
        <div className="form-group-resetpassword">
          <label className="label-resetpassword">Correo Electrónico o Nombre de Usuario</label>
          <input
            type="text"
            className="input-resetpassword"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className="form-group-resetpassword">
          <label className="label-resetpassword">Nueva Contraseña</label>
          <input
            type="password"
            className="input-resetpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group-resetpassword">
          <label className="label-resetpassword">Confirmar Contraseña</label>
          <input
            type="password"
            className="input-resetpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="button-resetpassword" onClick={handleResetPassword}>
          Restablecer Contraseña
        </button>
      </div>
    </>
  );
};

export default ResetPasswordPage;
