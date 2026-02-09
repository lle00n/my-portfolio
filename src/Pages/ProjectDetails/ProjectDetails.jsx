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
        <h1>This is the ProjectDetails-Subpage</h1>
        <img
          src="https://static.vecteezy.com/ti/gratis-vektor/p1/1218694-im-bau-befindliches-warnschild-kostenlos-vektor.jpg"
          alt="W3Schools.com"
          width="300"
          height="200"></img>
        <p>under construction!</p>
      </div>
      <div className="gradientBackground"></div>
    </div>
  );
}

export default ProjectDetails;