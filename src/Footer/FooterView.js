import './FooterStyle.css';
import MyThree from './Contact.js';

function Footer() {
  return (
    <div className="typingTitleDiv">
        <h1>Contact me</h1>
   <a href="mailto:example@example.com?subject=Hello%20there&body=This%20is%20a%20predefined%20email%20body."> 
      54coding
   </a>
   {/* <MyThree /> */}
    </div>
  );
}

export default Footer;
