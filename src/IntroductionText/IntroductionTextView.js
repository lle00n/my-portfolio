import './IntroductionText.css';
import { useTranslation } from "react-i18next";

function IntroductionText() {
  const { t } = useTranslation(); 
  return (
    <div className="introductionTextDiv">
      <div className="introductionTextSection">
        <h1>{t("aboutMeTitle")}</h1>
          <div className="introductionText">
          <p>{t("introductionText")}</p>
          </div>
        </div>
          <div className="introductionImage"></div>
    </div>
  );
}

export default IntroductionText;
