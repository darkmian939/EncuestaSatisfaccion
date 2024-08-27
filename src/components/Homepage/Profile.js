import React, { useState, useEffect } from 'react';
import '../../assets/css/Profile.styles.css';
import logoPK from '../../assets/img/logoPK.jpg';
import axios from '../../Api/Axiosconfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [section, setSection] = useState('Perfil');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, []);

  const handleMenuClick = (menuOption) => {
    setSection(menuOption);
    const element = document.getElementById(menuOption);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        name: name,
        lastName: lastName,
      };

      const response = await axios.put(`/api/user/${email}`, updatedData);

      if (response.status === 200) {
        const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Perfil actualizado correctamente.');
      } else {
        console.error('Error al actualizar perfil.');
      }
    } catch (error) {
      console.error('Error en la solicitud de actualización:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // Redirigir a la página de inicio de sesión
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile-pic">
          <img src={logoPK} alt="Profile" />
        </div>
        <h2>Usuario: {name} {lastName}</h2>
        <p>Email: {email}</p>
        <ul>
          <li onClick={() => handleMenuClick('Perfil')}>Perfil</li>
          <li onClick={() => handleMenuClick('Historial de Reservas')}>Historial de Reservas</li>
          <li onClick={() => handleMenuClick('Configuraciones de Cuenta')}>Configuraciones de Cuenta</li>
          <li onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </div>
      <div className="content">
        <div id="Perfil">
          <h1>Información General</h1>
          <div className="profile-info">
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Apellido:</strong> {lastName}</p>
            <p><strong>Email:</strong> {email}</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Apellido"
            />
            <button onClick={handleUpdateProfile}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
