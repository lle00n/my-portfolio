/**
 * ----------------------------------------------------------------------------
 * Description: ProjectSlider-component to navigate through the different projects
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react';
import navigateBack from '../Images/Icons/back.png';
import navigateNext from '../Images/Icons/next.png';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

import './ProjectSliderStyle.css';

const projectImages = Object.entries(
  import.meta.glob('../Images/Projects/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  })
);

function normalizeProjectName(name) {
  return name.replace(/\s+/g, '').toLowerCase();
}

function ProjectSlider() {
  const { t } = useTranslation();
  const projectsArray = t('projects', { returnObjects: true }) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLandscapeImage, setIsLandscapeImage] = useState(false);

  const currentProject = projectsArray[currentIndex];
  const currentProjectImage = currentProject
    ? projectImages.find(([imagePath]) => {
        const filename = imagePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
        return normalizeProjectName(filename).startsWith(normalizeProjectName(currentProject.title)) &&
          filename.toLowerCase().includes('cover');
      })?.[1] ?? ''
    : '';

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

  if (projectsArray.length === 0) return <p>No projects found</p>;

  return (
    <div className="ProjectSliderView">
      <h2 className="ProjectSliderTitle">{t("projectsTitle")}</h2>
      <div className="ProjectSlider">
        <div className={`ProjectDetails${isLandscapeImage ? ' isLandscape' : ''}`}>
          <div className="ProjectImageDiv">
            <img
              className={`ProjectImage${isLandscapeImage ? ' isLandscape' : ''}`}
              src={currentProjectImage}
              alt={`${currentProject.title} cover`}
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                setIsLandscapeImage(naturalWidth > naturalHeight);
              }}
            />
          </div>
          <div className="ProjectInformation">
            <h3 className="ProjectTitle">{projectsArray[currentIndex].title}</h3>
            <div className="ProjectText">
              {(projectsArray[currentIndex].description || "")
                .split("\n")
                .map((line, index) => (
                  <p key={index}>{line}</p>
                ))}

              {projectsArray[currentIndex].description.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              <Link to={`/my-portfolio/project/${projectsArray[currentIndex].id}`} className="projectDetailsLink">view more</Link>
            </div>
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
