import React, { useState } from 'react';
import '../../assets/css/Registeroptions.css';
import { Link } from 'react-router-dom';

const RegisterOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMouseEnter = (option) => {
    setSelectedOption(option);
  };

  const handleMouseLeave = () => {
    setSelectedOption(null);
  };

  return (
    <div className="register-options-container">
      <video autoPlay loop muted className="background-video">
        <source src={require('../../assets/img/vid/1110759_Animation_Blurred_1920x1080.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="logo-section">
        </div>
        <div className="text-content">
          <h2>¡Regístrate en Parkiando!</h2>
          <p>¡Explora Usme con Parkiando! Encuentra estacionamiento al instante y olvídate de las vueltas innecesarias. ¡Regístrate hoy y libérate del estrés de buscar parqueadero en Bogotá!</p>
        </div>
        <div className="options">
          <div
            className={`option parkiador ${selectedOption === 'parkiador' ? 'selected' : ''}`}
            onMouseEnter={() => handleMouseEnter('parkiador')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/user_register">
              <div className="image-container"></div>
              <button onClick={() => console.log('Registrarse como usuario')}>
                Regístrate como usuario
              </button>
            </Link>
          </div>
          <div
            className={`option propietario ${selectedOption === 'propietario' ? 'selected' : ''}`}
            onMouseEnter={() => handleMouseEnter('propietario')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/parking_register">
              <div className="image-container"></div>
              <button onClick={() => console.log('Registrarse como proveedor de parqueadero')}>
                Regístrate como proveedor de parqueadero
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default RegisterOptions;
