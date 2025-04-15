/**
 * ----------------------------------------------------------------------------
 * Description: Blueprint-component that displays the used technologies for the website as a blueprint
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */
import React, { useEffect, useRef } from 'react';
import './BlueprintStyle.css';
import { useTranslation } from "react-i18next";

const BluePrint = () => {
  const leftRef = useRef(null);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      if (!sectionRef.current || !leftRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollBottom = scrollTop + windowHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const leftDiv = leftRef.current;
      const divHeight = leftDiv.offsetHeight;
      const middleScreen = windowHeight / 2;
      const divTop = leftDiv.getBoundingClientRect().top;

      // Scroll direction
      const scrollingDown = scrollTop > lastScrollTop;
      lastScrollTop = scrollTop;

      const progress = (scrollBottom - sectionTop) / windowHeight;
      let slideProgress = Math.max(0, Math.min(1, progress - 0.4));
      let translateX;

      // --- Modified sliding-in logic ---
      // Previously: if (slideProgress < 0.1) { translateX = -100 + (slideProgress / 0.1) * 100; } else { translateX = 0; }
      // Now the sliding takes 20% of scroll progress:
      if (slideProgress < 0.2) {
        translateX = -100 + (slideProgress / 0.2) * 100;
      } else {
        translateX = 0;
      }
      // -----------------------------------

      // Slide out when scrolling up before center
      if (!scrollingDown && divTop > middleScreen - divHeight / 2) {
        const outProgress = Math.max(0, 1 - (divTop / (middleScreen - divHeight / 2)));
        const outTranslateX = -100 * outProgress;
        leftDiv.style.transform = `translate(${outTranslateX}%, 0%)`;
      } else {
        leftDiv.style.transform = `translate(${translateX}%, 0%)`;
      }

      // Stick to center during scroll
      const shouldStick =
        divTop <= middleScreen - divHeight / 2 &&
        scrollBottom < sectionBottom - windowHeight / 2;

      // Adjust condition to slide out only after scrolling 50% into the section
      const shouldSlideOutUp = scrollBottom >= sectionBottom - windowHeight * 0.5;

      if (shouldStick) {
        leftDiv.style.position = 'fixed';
        leftDiv.style.top = `${middleScreen - divHeight / 2}px`;
        leftDiv.style.left = '0';
      } else if (shouldSlideOutUp) {
        // Start sliding up
        const overflow = scrollBottom - (sectionBottom - windowHeight * 0.5);
        const maxScroll = windowHeight / 2 + divHeight;
        const progressY = Math.min(1, overflow / maxScroll);
        const translateY = -progressY * (windowHeight / 2 + divHeight);

        leftDiv.style.position = 'fixed';
        leftDiv.style.top = `${middleScreen - divHeight / 2}px`;
        leftDiv.style.left = '0';
        leftDiv.style.transform = `translate(0%, ${translateY}px)`;
      } else {
        // Reset when not sticking or sliding out
        leftDiv.style.position = 'relative';
        leftDiv.style.top = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="blueprint-section" ref={sectionRef}>
      <div className="left-side" ref={leftRef}>
        <h2>{t("blueprintTitle")}</h2>
        <div className="blueprint-container">
          <div className="grid-overlay"></div>
          <div className="blueprint-content">
            <p>Room Layout with Measurements</p>
            <div className="blueprint-box">Living Room</div>
            <div className="blueprint-box">Kitchen</div>
            <div className="blueprint-box">Bedroom</div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio...
        </p>
        <p>
          Fusce luctus vestibulum augue ut aliquet. Maecenas imperdiet, massa quis molestie faucibus...
        </p>
        <p>
          Nullam euismod ante ut leo placerat, ac accumsan orci dictum...
        </p>
        <p>
          Integer tempor, risus non sagittis scelerisque, erat velit vestibulum sapien...
        </p>
        <p>
          Aenean sodales nisi ac interdum finibus. Nunc posuere malesuada ipsum, a dictum sapien dignissim ut...
        </p>
      </div>
    </div>
  );
};

export default BluePrint;
