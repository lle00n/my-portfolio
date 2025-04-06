/**
 * ----------------------------------------------------------------------------
 * Description: SkillsView that displays the timeline and the SkillsIcons next to each other
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './SkillsStyle.css';
import Timeline from "./Timeline/Timeline.js";
import SkillsIconView from "./SkillsIcons/SkillsIconView.js";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Skills() {
  const [highlightedLanguages, setHighlightedLanguages] = useState([]);
  const [highlightedSection, setHighlightedSection] = useState(0);
  const { t } = useTranslation();
  const timelineData = t('educationSections', { returnObjects: true });

  const handleHover = (languages, section) => {
    setHighlightedLanguages(languages);
    setHighlightedSection(section);
  };

  return (
    <div className="skillsDiv">
      <h2 className="timelineMobileTitle">{t("timelineTitle")}</h2>
      <div className="timelineSkillsContent">
        <div className="timeline">
          <Timeline onHover={handleHover} />
        </div>
        <div className="technologies">
          <SkillsIconView highlightedLanguages={highlightedLanguages} highlightedSection={highlightedSection} />
        </div>
      </div>
    </div>
  );
}

export default Skills;
