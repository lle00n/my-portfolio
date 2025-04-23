/**
 * ----------------------------------------------------------------------------
 * Description: Blueprint-component that displays the used technologies for the website as a blueprint
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from 'react';
import './BlueprintStyle.css';
import { useTranslation } from "react-i18next";
import packageSvg from '../Images/Icons/BlueprintIcons/package.svg';
import gitPathSvg from '../Images/Icons/BlueprintIcons/gitPath.svg';
import githubLogoSvg from '../Images/Icons/BlueprintIcons/githubLogo.svg';

const BluePrint = () => {
  const leftRef = useRef(null);
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(null);

  const items = [
    { id: "section-2", name: "package1", x: 10, y: 20, type: "image", image: packageSvg },
    { id: "section-2", name: "package2", x: 10, y: 50, type: "image", image: packageSvg },
    { id: "section-2", name: "package3", x: 10, y: 100, type: "image", image: packageSvg },
    { id: "section-3", name: "gitPath", x: 150, y: 100, type: "image", image: gitPathSvg },
    { id: "section-1", name: "Item 3", x: 300, y: 200, type: "text" },
    { id: "section-4", name: "githubLogo", x: 100, y: 300, type: "image", image: githubLogoSvg },
    { id: "section-1", name: "Item 5", x: 500, y: 400, type: "text" }
  ];

  const blueprintInformations = t('blueprintInformations', { returnObjects: true });


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
      if (slideProgress < 0.2) {
        translateX = -100 + (slideProgress / 0.2) * 100;
        // Fade in only when sliding in
        leftDiv.style.opacity = Math.max(0, slideProgress / 0.2); // Fade in during the slide-in
      } else {
        translateX = 0;
        leftDiv.style.opacity = 1; // Stay fully opaque once the slide-in is complete
      }

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

      const shouldSlideOutUp = scrollBottom >= sectionBottom - windowHeight * 0.5;

      if (shouldStick) {
        leftDiv.style.position = 'fixed';
        leftDiv.style.top = `${middleScreen - divHeight / 2}px`;
        leftDiv.style.left = '0';
      } else if (shouldSlideOutUp) {
        const overflow = scrollBottom - (sectionBottom - windowHeight * 0.5);
        const maxScroll = windowHeight / 2 + divHeight;
        const progressY = Math.min(1, overflow / maxScroll);
        const translateY = -progressY * (windowHeight / 2 + divHeight);

        leftDiv.style.position = 'fixed';
        leftDiv.style.top = `${middleScreen - divHeight / 2}px`;
        leftDiv.style.left = '0';
        leftDiv.style.transform = `translate(0%, ${translateY}px)`;
      } else {
        leftDiv.style.position = 'relative';
        leftDiv.style.top = '0';
      }
    };



    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      items.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="blueprint-section" ref={sectionRef}>
      <div className="left-side" ref={leftRef}>
        <div className="blueprint-container">
          <div className="grid-overlay"></div>
          <div className="blueprint-content">
            {items.map((item, index) => {
              const isActive = item.id === activeItem;
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                    boxShadow: isActive ? "0 0 12px rgba(255, 165, 0, 0.6)" : "none"
                  }}
                >
                  {item.type === "text" ? (
                    <span style={{ fontSize: "12px", textAlign: "center" }}>{item.name}</span>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "40px", height: "40px"}}  // Adjust size as needed
                    />
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="right-side">
        {blueprintInformations.map(blueprintInformation => (
          <div
            key={blueprintInformation.id}
            id={blueprintInformation.id}
            className="scroll-section"
            style={{
              minHeight: "200px",
              padding: "20px",
              borderRadius: "8px",
              transition: "all 0.3s ease"
            }}
          >
            <h2>{blueprintInformation.name}</h2>
            <div>
              {blueprintInformation.text.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BluePrint;
