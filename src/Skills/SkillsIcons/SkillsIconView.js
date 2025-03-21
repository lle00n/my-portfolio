import React from "react";
import "./SkillsIconView.css"; // Add this for styling

const skills = [
  { id: "swift", name: "Swift/SwiftUI", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg" },
  { id: "js", name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
  { id: "ts", name: "TypeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  { id: "java", name: "Java", logo: "https://upload.wikimedia.org/wikipedia/de/e/e1/Java-Logo.svg" },
  { id: "php", name: "PHP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
  { id: "html", name: "HTML", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
  { id: "css", name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
  { id: "git", name: "Git", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" },
  { id: "scrum", name: "Scrum", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Scrum_process.svg" },
  { id: "react", name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { id: "xcode", name: "XCode", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/Xcode_14_icon.png" },
  { id: "mysql", name: "MySQL", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Database-mysql.svg" },
  { id: "kotlin", name: "Kotlin", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Kotlin-logo.png" },
];

const SkillsIconView = ({ highlightedLanguages = [] }) => {
  return (
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
  );
};

export default SkillsIconView;
