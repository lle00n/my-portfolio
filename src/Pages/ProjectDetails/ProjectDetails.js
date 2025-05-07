/**
 * ----------------------------------------------------------------------------
 * Description: Subpage that gives details for the different projects
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './ProjectDetails.css';
import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function ProjectDetails() {
  return (
    <div className="container">
      <div className="projectDetailsContent">
        <h1>This is the SubPage</h1>
        <p>Welcome to the SubPage!</p>
      </div>
      <div className="gradientBackground"></div>
    </div>
  );
}

export default ProjectDetails;