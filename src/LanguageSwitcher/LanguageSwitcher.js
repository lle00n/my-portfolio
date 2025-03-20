import React from "react";
import { useTranslation } from "react-i18next";
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="languageSwitcherDiv">
      <div class="button-container">
    <button class="round-button germany" onClick={() => changeLanguage("de")}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/400px-Flag_of_Germany.svg.png" alt="German Flag" class="flag-image" />
    </button>
    <button class="round-button uk" onClick={() => changeLanguage("en")}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/500px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="UK Flag" class="flag-image" />
    </button>
</div>

    </div>
  );
};

export default LanguageSwitcher;
