import { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ dropDate }) => {
  const [timerString, setTimerString] = useState("");

  useEffect(() => {
    console.log("Setting intervel...");

    // setInterval to run the code after an interval
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDate - currentDate;

      // maths time
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // set string
      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // if distance passes zero, means it's drop time
      if(distance < 0) {
        console.log("Clearing Interval...");
        clearInterval(interval);
      }
    }, 1000);

    // anytime out component unmounts, clear the interval
    return () => {
      if(interval) {
        clearInterval(interval);
      }
    }
  }, []);

  return (
    <div className="timer-container">
      <p className="timer-header">Candy Drop starting in</p>
      {timerString && <p className="timer-value">⏰ {timerString}</p>}
    </div>
  );
};

export default CountdownTimer;