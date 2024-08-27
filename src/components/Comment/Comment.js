import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Api/Axiosconfig.js';
import '../../assets/css/CommentBox.css';
import logo from '../../assets/img/logoPK.jpg';

const CommentBox = () => {
    const [selectedParking, setSelectedParking] = useState('');
    const [valoration, setValoration] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // Obtener el objeto de usuario del localStorage y extraer el correo electrónico
    const userEmail = () => {
        const userString = localStorage.getItem('user');
        const userObject = JSON.parse(userString);
        return userObject.email;
    };

    const handleStarClick = (value) => {
        setValoration(value);
    };

    const handleSubmit = async () => {
        try {
            const email = userEmail();
            if (!email) {
                throw new Error('Email not found or not a string in localStorage');
            }
    
            const response = await axios.post('http://localhost:3004/api/comments', {
                email: email,
                parking: selectedParking,
                valoration: valoration,
                comment: comment
            });
            setSubmitted(true);
            console.log('Comentario enviado:', response.data);
        } catch (error) {
            console.error('Error al enviar el comentario:', error.response ? error.response.data : error.message);
            setError('Error al enviar el comentario. Inténtalo de nuevo más tarde.');
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
            <div className="background">
                <div className="comment-box-container">
                    <div className="header">
                        <img src={logo} alt="Parkiando Logo" className="logo" />
                        <h2 className="title">Caja de Comentarios</h2>
                    </div>
                    <h1 className="titleN2">Parqueaderos</h1>
                    <div className="favorite-parking">
                        {['Parqueadero el Tiempo', 'Parqueadero Los Héroes', 'Parqueadero Santa Fe', 'Parqueadero Museo Nacional', 'Parqueadero La Candelaria'].map((parking) => (
                            <div
                                key={parking}
                                className={`parking ${selectedParking === parking ? 'selected' : ''}`}
                                onClick={() => setSelectedParking(parking)}
                            >
                                <p>{parking}</p>
                            </div>
                        ))}
                    </div>
                    <div className="star-container">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className={`star-button ${star <= valoration ? 'selected' : ''}`}
                                onClick={() => handleStarClick(star)}
                                disabled={!selectedParking}
                            >
                                {star}
                            </button>
                        ))}
                    </div>
                    <textarea
                        className="textarea"
                        disabled={!selectedParking || valoration === 0}
                        placeholder="Escribe tu comentario aquí..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="submit-button"
                        disabled={!selectedParking || valoration === 0 || comment === ''}
                        onClick={handleSubmit}
                    >
                        Enviar
                    </button>
                    {submitted && <p className="confirmation-message">Tu comentario ha sido enviado correctamente</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </>
    );
};

export default CommentBox;
