import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Api/Axiosconfig.js';
import '../../assets/css/CommentList.css'; // Asegúrate de que la ruta al CSS sea correcta
import logo from '../../assets/img/logoPK.jpg'; // Asegúrate de que la ruta al logo sea correcta

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [error, setError] = useState(null);
    const [editingComment, setEditingComment] = useState(null); // Estado para gestionar la edición de comentarios
    const [updatedParking, setUpdatedParking] = useState('');
    const [updatedValoration, setUpdatedValoration] = useState(0);
    const [updatedComment, setUpdatedComment] = useState('');
    const [updatedError, setUpdatedError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                // Obtener todos los comentarios
                const responseAll = await axios.get(`/api/comments`);
                setComments(responseAll.data);

                // Obtener comentarios del usuario actual
                const userEmail = localStorage.getItem('user');
                const userObject = JSON.parse(userEmail);
                const email = userObject.email;

                const responseByEmail = await axios.get(`/api/comments/email/${email}`);
                setUserComments(responseByEmail.data);
            } catch (error) {
                console.error('Error al obtener los comentarios:', error.response ? error.response.data : error.message);
                setError('Error al obtener los comentarios. Inténtalo de nuevo más tarde.');
            }
        };

        fetchComments();
    }, []);

    const handleUpdate = (email) => {
        // Buscar el comentario por su email
        const commentToEdit = comments.find(comment => comment.email === email);
        if (commentToEdit) {
            // Establecer los valores actuales del comentario a editar
            setUpdatedParking(commentToEdit.parking);
            setUpdatedValoration(commentToEdit.valoration);
            setUpdatedComment(commentToEdit.comment);
            setEditingComment(email); // Establecer el email del comentario que se está editando
        }
    };

    const cancelUpdate = () => {
        // Limpiar el estado de edición
        setEditingComment(null);
        setUpdatedParking('');
        setUpdatedValoration(0);
        setUpdatedComment('');
        setUpdatedError(null);
    };

    const handleUpdateSubmit = async () => {
        try {
            const userEmail = localStorage.getItem('user');
            const userObject = JSON.parse(userEmail);
            const email = userObject.email;

            const response = await axios.put(`/api/comments/email/${email}`, {
                email: email,
                parking: updatedParking,
                valoration: updatedValoration,
                comment: updatedComment
            });
            // Actualizar la lista de comentarios después de la actualización
            const updatedComments = comments.map(comment =>
                comment.email === email ? { ...comment, parking: updatedParking, valoration: updatedValoration, comment: updatedComment } : comment
            );
            setComments(updatedComments);
            setUserComments(updatedComments.filter(comment => comment.email === email)); // Actualizar comentarios del usuario actual
            cancelUpdate(); // Limpiar el formulario y estado de edición
            console.log('Comentario actualizado:', response.data);
        } catch (error) {
            console.error('Error al actualizar el comentario:', error.response ? error.response.data : error.message);
            setUpdatedError('Error al actualizar el comentario. Inténtalo de nuevo más tarde.');
        }
    };

    const handleDelete = async (email) => {
        // Lógica para eliminar un comentario
        try {
            await axios.delete(`/api/comments/email/${email}`);
            // Actualizar la lista de comentarios después de eliminar
            setComments(comments.filter(comment => comment.email !== email));
            setUserComments(userComments.filter(comment => comment.email !== email)); // Actualizar comentarios del usuario actual
            console.log('Comentario eliminado con email:', email);
        } catch (error) {
            console.error('Error al eliminar el comentario:', error.response ? error.response.data : error.message);
            setError('Error al eliminar el comentario. Inténtalo de nuevo más tarde.');
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
            <div className="comment-list-container">
                <h2 className="title">Comentarios del Usuario Actual</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="comment-list">
                    {userComments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header">
                                <h3 className="comment-title">{comment.parking}</h3>
                                <span className="comment-email">{comment.email}</span>
                            </div>
                            <p className="comment-body">{comment.comment}</p>
                            <div className="comment-actions">
                                {editingComment === comment.email ? (
                                    <div className="edit-form">
                                        <label>Parqueadero:</label>
                                        <input
                                            type="text"
                                            value={updatedParking}
                                            onChange={(e) => setUpdatedParking(e.target.value)}
                                        />
                                        <label>Valoración:</label>
                                        <input
                                            type="number"
                                            value={updatedValoration}
                                            onChange={(e) => setUpdatedValoration(parseInt(e.target.value))}
                                        />
                                        <label>Comentario:</label>
                                        <textarea
                                            value={updatedComment}
                                            onChange={(e) => setUpdatedComment(e.target.value)}
                                        />
                                        {updatedError && <p className="error-message">{updatedError}</p>}
                                        <button onClick={handleUpdateSubmit}>Guardar</button>
                                        <button onClick={cancelUpdate}>Cancelar</button>
                                    </div>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleUpdate(comment.email)}>Editar</button>
                                        <button className="delete-button" onClick={() => handleDelete(comment.email)}>Eliminar</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="all-comments-container">
                <h2>Todos los Comentarios</h2>
                <div className="all-comments">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <h3 className="comment-title">{comment.parking}</h3>
                            <span className="comment-email">{comment.email}</span>
                            <p className="comment-body">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommentList;
