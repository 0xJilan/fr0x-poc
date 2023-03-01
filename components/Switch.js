import React from "react";
import styles from "@/styles/Switch.module.css";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className={styles.reactSwitchContainer}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.reactSwitchCheckbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className={styles.reactSwitchLabel}
        htmlFor={`react-switch-new`}
      >
        <span className={styles.reactSwitchButton} />
      </label>
      <p>{isOn ? "Long" : "Short"}</p>
    </div>
  );
};

export default Switch;
