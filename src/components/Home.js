import React from 'react';
import { Banner } from './Homepage/Banner';
import Contact  from './Homepage/Contact';
import Footer from './Homepage/Footer';
import Navbar from './Homepage/NavBar';
import { Projects } from './Homepage/Projects';
import { Skills } from './Homepage/Skills';
import '../assets/css/Home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner id="banner" />
      <Skills id="skills" />
      <Projects id="projects" />
      <Contact id="contact" />
      <Footer id="footer" />
    </div>
  );
};

export default Home;
