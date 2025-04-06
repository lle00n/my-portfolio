import { useState } from 'react';
import navigateBack from '../Images/Icons/back.png';
import navigateNext from '../Images/Icons/next.png';
import { useTranslation } from "react-i18next";

import './ProjectSliderStyle.css';

function ProjectSlider() {
  const { t } = useTranslation();
  const projectsArray = t('projects', { returnObjects: true });


  const [array] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProjectImage = require(`../Images/Projects/${projectsArray[currentIndex].title}Cover.png`);

  function handleNextCall() {
    setCurrentIndex((prevIndex) =>
      prevIndex < projectsArray.length - 1 ? prevIndex + 1 : 0
    );
  }
  function handlePreviousCall() {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : projectsArray.length - 1
    );
  }

  return (
    <div className="ProjectSliderView">
      <h2 className="ProjectSliderTitle">{t("projectsTitle")}</h2>
      <div id="ProjectSlider">
        <div className="ProjectDetails">
          <div className="ProjectImageDiv">
            <img className="ProjectImage" src={currentProjectImage} alt={`${projectsArray[currentIndex].title}Cover`} />
          </div>
          <div className="ProjectInformation">
            <h3 className="ProjectTitle">{projectsArray[currentIndex].title}</h3>
            <div classname="UsedTechnologies"></div>
            {projectsArray[currentIndex].description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="projectNavigations">
          <button onClick={handlePreviousCall} className="sliderButtonLeft">
            <img src={navigateBack} height="35" width="35" />
          </button>
          <button onClick={handleNextCall} className="sliderButtonRight">
            <img src={navigateNext} height="35" width="35" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSlider;
