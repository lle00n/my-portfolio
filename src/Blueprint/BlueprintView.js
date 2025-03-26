import { Typewriter } from "react-simple-typewriter";
import './BlueprintStyle.css';
import { useTranslation } from "react-i18next";

function Blueprint() {
  const { t } = useTranslation(); 

  return (
    <div className="blueprintDiv">
    <h2>{t("blueprintTitle")}</h2>
    <div className="blueprint-container">
      {/* Grid Lines */}
      <div className="grid-overlay"></div>

      {/* Sample Content */}
      <div className="blueprint-content">
        <p>Room Layout with Measurements</p>
        <div className="blueprint-box">Living Room</div>
        <div className="blueprint-box">Kitchen</div>
        <div className="blueprint-box">Bedroom</div>
      </div>
    </div>
    </div>
  );
}

export default Blueprint;
