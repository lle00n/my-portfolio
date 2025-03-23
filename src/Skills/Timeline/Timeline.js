import React from "react";
import { useTranslation } from "react-i18next";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";

const timelineData = [
  {
    id: 1,
    title: "Ausbildung - Basislehrjahr",
    date: "2018 - 2019",
    description: "Completed my education with a degree in Computer Science.",
    languages: ["js", "ts", "java", "php", "html", "css", "git", "scrum", "mysql"],
    color: "purple",
  },
  {
    id: 2,
    title: "Ausbildung - Mobile Team",
    date: "2019 - 2022",
    description: "Started working as a software engineer in a tech company.",
    languages: ["js", "java", "git","scrum","swift","xcode","kotlin"],
    color: "purple",
  },
  {
    id: 3,
    title: "Software Developer",
    date: "2022 - 2024",
    description: "Started working as a software engineer in a tech company.",
    languages: ["swift", "js", "ts","html","css","git","scrum","react","xcode","java"],
    color: "purple",
  },
];

const Timeline = ({ onHover }) => {
  const { t } = useTranslation(); 
  return (
    <div>
      <h2 className="skillsTitle">{t("timelineTitle")}</h2>
      <VerticalTimeline>
        {timelineData.map((event) => (
          <VerticalTimelineElement
            key={event.id}
            className="vertical-timeline-element--work"
            iconStyle={{ background: event.color, color: "#fff" }}
          >
            {/* ✅ Wrap content in a div to attach event handlers */}
            <div
              onMouseEnter={() => onHover(event.languages)}
              onMouseLeave={() => onHover([])}
            >
              <h3 className="vertical-timeline-element-title">{event.title}</h3>
              <p>{event.date}</p>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
