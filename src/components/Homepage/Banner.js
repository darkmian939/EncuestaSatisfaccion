import React from 'react';
import '../../assets/css/home/banner.css';
import { Container, Row, Col } from 'react-bootstrap';
import useBannerLogic from '../../containers/Homepagecontainer/BannerLogic';
import headerImg from '../../assets/img/carro prom.png';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const { text } = useBannerLogic();

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h1>{`¡BIENVENIDOS A PARKIANDO!`}</h1>
                  <p>Parkiando hace que aparcar sea fácil y conveniente! Reserva tu estacionamiento sin filas ni esperas desde tu celular en cualquier momento. ¡No más estrés ni pérdida de tiempo.</p>
                  <button className='Button-join' onClick={() => console.log('connect')}>ÚNETE <ArrowRightCircle size={25} /></button>
                </div>}

                
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
