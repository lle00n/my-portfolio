import './FooterStyle.css';
import MyThree from './Contact.js';
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation(); 

  return (
    <div className="typingTitleDiv">
        <h1>{t("contactMeTitle")}</h1>
   <a href="mailto:example@example.com?subject=Hello%20there&body=This%20is%20a%20predefined%20email%20body."> 
      54coding
   </a>
   {/* <MyThree /> */}
    </div>
  );
}

export default Footer;
