/**
 * ----------------------------------------------------------------------------
 * Description: TypingTitle-component that is the landing-page section the user sees when opening the website
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import { Typewriter } from "react-simple-typewriter";
import './TypingTitleStyle.css';
import { useTranslation } from "react-i18next";

function TypingTitle() {
  const { t } = useTranslation();

  return (
    <div className="typingTitleDiv">
      <h1>{t("typingTitleSmall")}</h1>
      <h1 className="typingTitle">
        <Typewriter words={["Léon Albert"]}
          typeSpeed={200}
          deleteSpeed={50}
          loop={Infinity}
          cursor
          cursorStyle="_"
          delaySpeed={10000}
        />
      </h1>
    </div>
  );
}

export default TypingTitle;
