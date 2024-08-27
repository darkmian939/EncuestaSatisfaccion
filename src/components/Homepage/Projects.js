import React from 'react';
import '../../assets/css/home/project.css';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../../assets/img/parq1.png";
import projImg2 from "../../assets/img/parq2.png";
import projImg3 from "../../assets/img/parq3.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
    {
      title: "PARQUEADERO VALLES DE CAFAM",
      description: "Por sus variedad de precio",
      imgUrl: projImg1,
      capacidad: "200 vehículos",
      horario: "24 horas",
      ubicacion: "Cra. 69, Bogotá",
      calificacion: "★★★★☆"
    },
    {
      title: "PARQUEADERO SERRANIAS",
      description: "Amplios espacios de aparcamiento",
      imgUrl: projImg2,
      capacidad: "150 vehículos",
      horario: "6 AM - 10 PM",
      ubicacion: "Calle 127, Bogotá",
      calificacion: "★★★★★"
    },
    {
      title: "PARQUEADERO LOS ANGELES",
      description: "Alta flujo de vehículos",
      imgUrl: projImg3,
      capacidad: "100 vehículos",
      horario: "7 AM - 9 PM",
      ubicacion: "Av. Boyacá, Bogotá",
      calificacion: "★★★☆☆"
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>NUESTROS ESTABLECIMIENTOS ☆☆☆</h2>
                <p>Descubre nuestros parqueaderos preferidos, seleccionados para ofrecerte la mejor experiencia. Únete a nosotros y disfruta de un estacionamiento excepcional</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {projects.map((project, index) => (
                          <ProjectCard key={index} {...project} />
                        ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <p>Desafiamos el tedio de encontrar parqueaderos en Usme! Nuestra solución: una plataforma donde encuentras y reservas fácilmente desde múltiples opciones según tu ubicación. ¡Adiós a las largas esperas y trayectos agotadores! Descubre cómo simplificamos el estacionamiento en Usme. ¡Tu comodidad es nuestra meta! </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Desafiamos el tedio de encontrar parqueaderos en Usme! Nuestra solución: una plataforma donde encuentras y reservas fácilmente desde múltiples opciones según tu ubicación. ¡Adiós a las largas esperas y trayectos agotadores! Descubre cómo simplificamos el estacionamiento en Usme. ¡Tu comodidad es nuestra meta! </p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
