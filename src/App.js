import logo from './logo.svg';
import './App.css';
import ProjectSlider from './ProjectSlider/ProjectSliderView.js';
import TypingTitle from './TypingTitle/TypingTitleView.js';
import Footer from './Footer/FooterView.js';
import Skills from './Skills/SkillsView.js';
import React, { useRef, useState } from "react";

import Confetti from "react-confetti";



function App() {
  return (
    <div className="Container">
    <div className="App">
    <TypingTitle />
    <div className="ProjectSliderSection">
    <ProjectSlider />
    </div>
    <Skills />
    <Footer />
    </div>
    <div className="gradientBackground"></div>
    </div>
  );
}

export default App;
