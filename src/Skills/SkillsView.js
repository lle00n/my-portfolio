import './SkillsStyle.css';
import Timeline from "./Timeline/Timeline.js";
import SkillsIconView from "./SkillsIcons/SkillsIconView.js";
import React, { useState } from "react";

function Skills() {
  const [highlightedLanguages, setHighlightedLanguages] = useState([]);

  return (
    <div className="skillsDiv"> 
    <div className="timeline">
      <Timeline onHover={setHighlightedLanguages} />
        </div>
        <div className="technologies">
          <SkillsIconView highlightedLanguages={highlightedLanguages} />
        </div>
    </div>
  );
}

export default Skills;
