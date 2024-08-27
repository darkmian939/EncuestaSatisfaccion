import React, { useState, useEffect } from 'react';
import '../../assets/css/Review.css'; // Ajusta la ruta del CSS según sea necesario

const CommentsPage = () => {
  const [comentarios, setComentarios] = useState([]);

  // Simulación de carga de comentarios desde una API
  useEffect(() => {
    // Simulación de consulta a una API (aquí simplemente usamos datos estáticos)
    const fetchComentarios = () => {
      // Aquí normalmente harías una solicitud HTTP a tu API real
      // Por ahora, usamos datos estáticos como ejemplo
      const data = [
        {
          id: 1,
          usuario: 'Usuario1',
          comentario: 'Excelente servicio, muy recomendado.',
          calificacion: 5,
        },
        {
          id: 2,
          usuario: 'Usuario2',
          comentario: 'Buen lugar, pero podría mejorar en la limpieza.',
          calificacion: 3,
        },
        {
          id: 3,
          usuario: 'Usuario3',
          comentario: 'El servicio al cliente es excelente.',
          calificacion: 4,
        },
      ];
      // Simulamos la demora de la API usando setTimeout
      setTimeout(() => {
        setComentarios(data);
      }, 1000); // Simula un segundo de carga
    };

    fetchComentarios();
  }, []);

  // Componente Comment dentro de CommentsPage
  const Comment = ({ comentario }) => (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-user">{comentario.usuario}</span>
        <div className="comment-rating">
          <span>Calificación: {comentario.calificacion}</span>
        </div>
      </div>
      <p className="comment-text">{comentario.comentario}</p>
    </div>
  );

  return (
    <div className="comments-page">
      <h1>Comentarios y Calificaciones</h1>
      <div className="comments-list">
        {comentarios.length === 0 ? (
          <p>Cargando comentarios...</p>
        ) : (
          comentarios.map((comentario) => (
            <Comment key={comentario.id} comentario={comentario} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
