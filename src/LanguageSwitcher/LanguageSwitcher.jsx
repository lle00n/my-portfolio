/**
 * ----------------------------------------------------------------------------
 * Description: Component to switch the language
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log("scrollY:", currentScrollY, "last:", lastScrollY);

      if (currentScrollY > lastScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`languageSwitcherDiv ${visible ? "visible" : "hidden"}`}>
      <div className="button-container">
        <button className="round-button germany" onClick={() => changeLanguage("de")}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/400px-Flag_of_Germany.svg.png" alt="German Flag" className="flag-image" />
        </button>
        <button className="round-button uk" onClick={() => changeLanguage("en")}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/500px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="UK Flag" className="flag-image" />
        </button>
      </div>

    </div>
  );
};

export default LanguageSwitcher;
