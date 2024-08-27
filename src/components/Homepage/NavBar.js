import React from 'react';
import logo from '../../assets/img/loguito.png'
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../../assets/css/home/Nav-register.css'; // Importa el archivo CSS

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="#home" className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </a>
                <ul className="navbar-links">
                <li>
                        <Link to="/signin">Iniciar sesión</Link>
                    </li>
                    <li>
                        <a href="#home">Nosotros</a>
                    </li>
                    <li>
                        <a href="#skills">¿Cómo reservar?</a>
                    </li>
                    <li>
                        <a href="#projects">Nuestros establecimientos</a>
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
