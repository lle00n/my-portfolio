import './App.css';
import ProjectSlider from './ProjectSlider/ProjectSliderView.js';
import TypingTitle from './TypingTitle/TypingTitleView.js';
import Footer from './Footer/FooterView.js';
import Skills from './Skills/SkillsView.js';
import IntroductionText from './IntroductionText/IntroductionTextView.js';
import React, { useRef, useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher.js";
import Blueprint from "./Blueprint/BlueprintView.js"
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation(); 
  useEffect(() => {
    document.title = t("browserTitle");
  }, []);
  //  <Blueprint /> before footer
  return (
    <div className="Container">
    <div className="App">
    <TypingTitle />
    <IntroductionText className="IntroductionText" />
    <Skills /> 
    <div className="ProjectSliderSection">
    <ProjectSlider />
    </div>
    <Footer />
    </div>
    <div className="gradientBackground"></div>
    <div className="overlayLanguageSwitch">
      <LanguageSwitcher />
    </div>
    </div>
  );
}

export default App;
