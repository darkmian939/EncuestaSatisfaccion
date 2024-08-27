import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Establishment.css'; // Ajusta la ruta si es necesario
import logo from '../../assets/img/loguito.png'; // Ajusta la ruta de la imagen del logo
import axios from '../../Api/Axiosconfig.js'; // Import axios configuration

const EstablishmentForm = () => {
  const [formData, setFormData] = useState({
    EstablishmentName: '',
    Owner: '',
    Address: '',
    Capacity: '',
    MotoPrice: '',
    CarPrice: ''
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGuardar = async () => {
    try {
      const response = await axios.post('/api/establishments', formData);
      console.log('Establecimiento registrado:', response.data);
      setMessage('¡Establecimiento registrado exitosamente!');
      alert('¡Tus datos se enviaron correctamente! en los proximos dias se te comunicara la integracion de tu establecimiento en Parkiando ');
      navigate('/profile');
    } catch (error) {
      console.error('Error al registrar establecimiento:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage('Error al registrar establecimiento: ' + error.response.data.error);
      } else {
        setMessage('Error al registrar establecimiento.');
      }
    }
  };


  const handleLogout = () => {
    // Aquí puedes eliminar cualquier token o información de sesión almacenada en el cliente
    localStorage.removeItem('token'); // o cualquier otra clave que uses para almacenar la sesión
    sessionStorage.removeItem('token'); // para mayor seguridad, puedes eliminar ambos
    alert('¡Sesión cerrada!');
    navigate('/', { replace: true }); // Utilizar 'replace: true' para prevenir la navegación hacia atrás
  };

  return (
    <>
      <nav className="navbar-establishment">
        <Link to="/">
          <img src={logo} alt="Logo de Establecimiento" className="navbar-logo-establishment" />
        </Link>
        <div className="navbar-links-establishment">
          <Link to="/"><span>Inicio</span></Link>
          <Link to="/"><span>Comentarios</span></Link>
          <Link to="/profile"><span>Perfil</span></Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </nav>

      <div className="container-establishment">
        <img src={logo} alt="Logo de la página" className="logo-establishment" />
        <h1 className="h1-establishment">Agrega tu Establecimiento</h1>
        <p className="subtitle-establishment">¡Parkiando! Tu lugar ideal para estacionar</p>
        <div className="form-group-establishment">
          <label className="label-establishment">Nombre del Establecimiento</label>
          <input
            type="text"
            name="EstablishmentName"
            className="input-establishment"
            value={formData.EstablishmentName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group-establishment">
          <label className="label-establishment">Propietario del Negocio</label>
          <input
            type="text"
            name="Owner"
            className="input-establishment"
            value={formData.Owner}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group-establishment">
          <label className="label-establishment">Dirección</label>
          <input
            type="text"
            name="Address"
            className="input-establishment"
            value={formData.Address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group-establishment">
          <label className="label-establishment">Capacidad</label>
          <input
            type="number"
            name="Capacity"
            className="input-establishment"
            value={formData.Capacity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group-establishment">
          <label className="label-establishment">Precio por minuto de Moto</label>
          <input
            type="number"
            name="MotoPrice"
            className="input-establishment"
            value={formData.MotoPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group-establishment">
          <label className="label-establishment">Precio por minuto de Carro</label>
          <input
            type="number"
            name="CarPrice"
            className="input-establishment"
            value={formData.CarPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="button-establishment" onClick={handleGuardar}>
          Guardar
        </button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default EstablishmentForm;
