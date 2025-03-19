import { Typewriter } from "react-simple-typewriter";
import './TypingTitleStyle.css';

function TypingTitle() {
  return (
    <div className="typingTitleDiv">
        <h1>Welcome to</h1>
    <h1 className="typingTitle">
      <Typewriter words={["54coding!"]} 
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
