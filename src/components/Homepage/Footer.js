import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import parkiandoLogo from '../../assets/img/loguito.png';
import facebookLogo from '../../assets/img/facebook-logo.png';
import twitterLogo from '../../assets/img/twitter-logo.png';
import instagramLogo from '../../assets/img/instagram-logo.png';
import linkedinLogo from '../../assets/img/linkedin-logo.png';
import '../../assets/css/home/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <img src={parkiandoLogo} alt="Parkiando Logo" className="footer-logo" />
            <p className="rights-text">Derechos reservados Parkiando 2023 ®</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <h5>Contacto</h5>
            <ul className="contact-list">
              <li>
                <span>Teléfono: (123) 456-7890</span>
              </li>
              <li>
                <span>Correo Electrónico: info@parkiando.com</span>
              </li>
              <li>
                <span>Dirección: Calle Ficticia #123, Ciudad Ficticia</span>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} className="footer-col">
            <h5>Síguenos</h5>
            <div className="social-icons">
              <a href="#!">
                <img src={facebookLogo} alt="Facebook Logo" />
              </a>
              <a href="#!">
                <img src={twitterLogo} alt="Twitter Logo" />
              </a>
              <a href="#!">
                <img src={instagramLogo} alt="Instagram Logo" />
              </a>
              <a href="#!">
                <img src={linkedinLogo} alt="LinkedIn Logo" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
