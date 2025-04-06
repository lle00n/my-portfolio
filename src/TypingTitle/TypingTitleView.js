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
          typeSpeed={200}  // Typing speed
          deleteSpeed={50} // Speed at which text is deleted
          loop={Infinity}
          cursor
          cursorStyle="_"
          delaySpeed={10000} // Delay before starting a new word
        />
      </h1>
    </div>
  );
}

export default TypingTitle;
