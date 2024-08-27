import React from 'react';
import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, capacidad, horario, ubicacion, calificacion }) => {
  return (
    <Col xs={12} sm={6} md={4} className="proj-card">
      <div className="proj-content">
        <div className="proj-imgbx">
          <img src={imgUrl} alt={title} className="img-fluid" />
        </div>
        <div className="proj-info">
          <h4>{title}</h4>
          <p>{description}</p>
          <p><strong>Capacidad:</strong> {capacidad}</p>
          <p><strong>Horario:</strong> {horario}</p>
          <p><strong>Ubicación:</strong> {ubicacion}</p>
          <p><strong>Calificación:</strong> {calificacion}</p>
        </div>
      </div>
    </Col>
  );
};
