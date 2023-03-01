import { useState, useEffect } from "react";
import styles from "@/styles/TimeBox.module.css";

const convertTimeToSeconds = (minutes, hours, days) => {
  return minutes * 60 + hours * 3600 + days * 86400;
};

const TimeBox = ({ setExpiration }) => {
  const [minutes, setMinutes] = useState(5);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    let timeInSeconds = convertTimeToSeconds(minutes, hours, days);
    setExpiration(timeInSeconds);
  }, [minutes, hours, days]);

  return (
    <div className={styles.container}>
      <p>
        Expiration time: {`${days} days, ${hours} hours, ${minutes} minutes`}
      </p>
      <div>
        <input
          type="range"
          id="minutes"
          name="minutes"
          min="0"
          max="59"
          defaultValue={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <label htmlFor="minutes">Minutes</label>
      </div>
      <div>
        <input
          type="range"
          id="hours"
          name="hours"
          min="0"
          max="23"
          defaultValue={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <label htmlFor="hours">Hours</label>
      </div>
      <div>
        <input
          type="range"
          id="days"
          name="days"
          min="0"
          max="13"
          defaultValue={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <label htmlFor="days">Days</label>
      </div>
    </div>
  );
};

export default TimeBox;
