/**
 * ----------------------------------------------------------------------------
 * Description: Introduction text with some informations about me
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './IntroductionText.css';
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

function IntroductionText() {
  const { t } = useTranslation();
  const test = t("introductionText");
  const ref = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 1.5;

      const distance = Math.abs(rect.top + rect.height / 2 - centerY);

      // Fade slower: increase this value
      const fadeDistance = windowHeight; // ⬅ fade in earlier, out later

      const newOpacity = 1 - Math.min(distance / fadeDistance, 1);

      setOpacity(newOpacity);
    };

    handleScroll(); // initial calculation
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="introductionTextDiv"
      style={{
        opacity,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <div className="introductionTextSection">
        <h1>{t("aboutMeTitle")}</h1>
        <div className="introductionText">
          {test.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="introductionImage"></div>
    </div>
  );
}

export default IntroductionText;
