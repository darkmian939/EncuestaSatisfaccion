import React from 'react';
import '../../assets/css/Profile.styles.css';


const Profile = () => {
  const handleMenuClick = (menuOption) => {
    const element = document.getElementById(menuOption);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="appk-container">
      <div className="sidebar-apk">
        </div>
      <div className="content">
        <div id="AplicacionMovil">
          <h1>Parkiando</h1>
          <p>¡Descarga nuestra aplicación móvil Parkiando y disfruta de una mejor experiencia!</p>
          <a href="https://example.com/download" target="_blank" rel="noopener noreferrer">
            Descargar aquí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;

