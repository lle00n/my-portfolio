import { useState } from 'react';
import navigateBack from '../Images/Icons/back.png';
import navigateNext from '../Images/Icons/next.png';

import './ProjectSliderStyle.css';

function ProjectSlider() {
    const [currentlyDisplayedProject, setCurrentlyDisplayedProject] = useState("Project1");
    const [currentlyDisplayedProjectCounter, setCurrentlyDisplayedProjectCounter] = useState(1);
    const totalProjects = 5;


  const [array] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [currentIndex, setCurrentIndex] = useState(0);

    function handleNextCall() {
        setCurrentIndex((prevIndex) =>
          prevIndex < array.length - 1 ? prevIndex + 1 : 0
        );
      }
      function handlePreviousCall() {
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : array.length - 1
        );
      }

  return (
    <div className="ProjectSliderView">
        <h2 className="ProjectSliderTitle">Current Projects</h2>
        <div id="ProjectSlider">
          <div className="ProjectDetails">
            <div className="ProjectImage"></div>
            <div className="ProjectInformation">
            <h3 className="ProjectTitle">iOS-Project {currentIndex}</h3>
            <div classname="UsedTechnologies"></div>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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
