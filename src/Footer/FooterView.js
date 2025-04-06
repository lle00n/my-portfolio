/**
 * ----------------------------------------------------------------------------
 * Description: Footer component with the 3 buttons to get in contact
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './FooterStyle.css';
import MyThree from './Contact.js';
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footerDiv">
      <h1>{t("contactMeTitle")}</h1>
      <div className="contact-buttons">
        <a href="mailto:leon.raoul.albert@gmail.com" className="contact-button email">
        </a>
        <a href="https://www.linkedin.com/in/l%C3%A9on-a-10535622b/" target="_blank" rel="noopener noreferrer" className="contact-button linkedin">
        </a>
        <a href="https://github.com/lle00n" target="_blank" rel="noopener noreferrer" className="contact-button github">
        </a>
      </div>
    </div>
  );
}

export default Footer;
