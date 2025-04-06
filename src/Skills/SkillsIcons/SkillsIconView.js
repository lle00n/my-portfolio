import React from "react";
import "./SkillsIconView.css"; // Add this for styling
import { useTranslation } from "react-i18next";
import SwiftLogo from '../../Images/Icons/skills/Swift.svg';
import CSSLogo from '../../Images/Icons/skills/CSS.svg';
import GitLogo from '../../Images/Icons/skills/GitLogo.svg';
import HTMLLogo from '../../Images/Icons/skills/HTML.svg';
import JavaLogo from '../../Images/Icons/skills/Java.svg';
import JavaScriptLogo from '../../Images/Icons/skills/JavaScript.svg';
import KotlinLogo from '../../Images/Icons/skills/Kotlin.svg';
import MySQLLogo from '../../Images/Icons/skills/MySQL.svg';
import ReactLogo from '../../Images/Icons/skills/React.svg';
import ScrumLogo from '../../Images/Icons/skills/Scrum.svg';
import TypeScriptLogo from '../../Images/Icons/skills/TypeScript.svg';
import XCodeLogo from '../../Images/Icons/skills/XCode.svg';
import PHPLogo from '../../Images/Icons/skills/PHP.svg';

const skills = [
  { id: "swift", name: "Swift/SwiftUI", logo: SwiftLogo },
  { id: "js", name: "JavaScript", logo: JavaScriptLogo },
  { id: "ts", name: "TypeScript", logo: TypeScriptLogo },
  { id: "java", name: "Java", logo: JavaLogo },
  { id: "php", name: "PHP", logo: PHPLogo },
  { id: "html", name: "HTML", logo: HTMLLogo },
  { id: "css", name: "CSS", logo: CSSLogo },
  { id: "git", name: "Git", logo: GitLogo },
  { id: "scrum", name: "Scrum", logo: ScrumLogo },
  { id: "react", name: "React", logo: ReactLogo },
  { id: "xcode", name: "XCode", logo: XCodeLogo },
  { id: "mysql", name: "MySQL", logo: MySQLLogo },
  { id: "kotlin", name: "Kotlin", logo: KotlinLogo },
];

const SkillsIconView = ({ highlightedLanguages = [], highlightedSection = 0 }) => {
  const { t } = useTranslation();
  //const educationSectionTexts = t('educationSectionInformations', { returnObjects: true });
  const sectionData = t(`educationSectionInformations.${highlightedSection}`, { returnObjects: true });

  return (
    <div className="skillsView">
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-item">
            <img
              src={skill.logo}
              alt={skill.name}
              title={skill.name}
              className={highlightedLanguages.includes(skill.id) ? "highlighted" : ""}
            />
          </div>
        ))}
      </div>
      {sectionData.description.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default SkillsIconView;
