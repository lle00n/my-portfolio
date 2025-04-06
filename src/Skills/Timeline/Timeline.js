/**
 * ----------------------------------------------------------------------------
 * Description: Timeline with all the teams I worked for in the past
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import React from "react";
import { useTranslation } from "react-i18next";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";



const Timeline = ({ onHover }) => {
  const { t } = useTranslation();
  const timelineData = t('educationSections', { returnObjects: true });
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
            <div
              onMouseEnter={() => onHover(event.languages, event.id)}
              onMouseLeave={() => onHover([], 0)}>
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
