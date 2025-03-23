import './IntroductionText.css';
import { useTranslation } from "react-i18next";

function IntroductionText() {
  const { t } = useTranslation(); 
  const test = t("introductionText");
  return (
    <div className="introductionTextDiv">
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
