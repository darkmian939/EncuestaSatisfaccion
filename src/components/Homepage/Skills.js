import React, { useState } from 'react';
import '../../assets/css/home/skills.css';
import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import meter1 from "../../assets/img/user-login.png";
import meter2 from "../../assets/img/placeholder.png";
import meter3 from "../../assets/img/search.png";
import meter4 from "../../assets/img/right.png";
import meter5 from "../../assets/img/car.png";
import colorSharp from "../../assets/img/color-sharp.png";

const items = [
  { id: 1, img: meter1, title: "Iniciar sesión" },
  { id: 2, img: meter2, title: "Actualiza tu ubicación" },
  { id: 3, img: meter3, title: "Buscar parqueadero" },
  { id: 4, img: meter4, title: "Realiza tu reserva" },
  { id: 5, img: meter5, title: "Acércate al establecimiento" }
];

export const Skills = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const handleBeforeChange = (previousSlide, nextSlide) => {
    setCurrentSlide(nextSlide);
  };

  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col size={12}>
            <div className="skill-bx wow zoomIn">
              <h2>COMO RESERVAS CON NOSOTROS</h2>
              <p>¡Reserva tu espacio de estacionamiento en Usme desde cualquier lugar con Parkiando! Descubre cómo hacerlo de manera rápida y sencilla.</p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
                beforeChange={handleBeforeChange}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={3000}
              >
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`item ${index === (currentSlide + 1) % items.length ? 'center' : ''}`}
                  >
                    <img src={item.img} alt="Image" />
                    <h5>{item.title}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} alt="background" />
    </section>
  );
};
