/**
 * ----------------------------------------------------------------------------
 * Description: Home file that is the parent component and combines all other child components
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './Home.css';
import ProjectSlider from '../../ProjectSlider/ProjectSliderView.js';
import TypingTitle from '../../TypingTitle/TypingTitleView.js';
import Footer from '../../Footer/FooterView.js';
import Skills from '../../Skills/SkillsView.js';
import IntroductionText from '../../IntroductionText/IntroductionTextView.js';
import React, { useRef, useEffect } from "react";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher.js";
import Blueprint from "../../Blueprint/BlueprintView.js";
import { useTranslation } from "react-i18next";
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();
  const sectionRefs = useRef([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    document.title = t("browserTitle");
  }, [t]);

  // Scroll to section center
  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Handle arrow key scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const max = sectionRefs.current.length - 1;

        if (e.key === "ArrowDown" && currentIndexRef.current < max) {
          currentIndexRef.current += 1;
        } else if (e.key === "ArrowUp" && currentIndexRef.current > 0) {
          currentIndexRef.current -= 1;
        }

        scrollToSection(currentIndexRef.current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="Container">
      <div className="Home">
        <div ref={el => sectionRefs.current[0] = el}>
          <TypingTitle />
        </div>
        <div ref={el => sectionRefs.current[1] = el}>
          <IntroductionText className="IntroductionText" />
        </div>
        <div ref={el => sectionRefs.current[2] = el}>
          <Skills />
        </div>
        <div ref={el => sectionRefs.current[3] = el} className="ProjectSliderSection">
          <ProjectSlider />
        </div>
        <div ref={el => sectionRefs.current[4] = el}>
          <Blueprint />
        </div>
        <div ref={el => sectionRefs.current[5] = el}>
          <Footer />
        </div>
      </div>
      <div className="gradientBackground"></div>
      <div className="overlayLanguageSwitch">
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default Home;
