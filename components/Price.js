import React from "react";

const Price = ({ label, value, setValue }) => {
  return (
    <label>
      {label}
      <input
        type="number"
        value={value}
        min="0.001"
        max="1000000000"
        step="0.001"
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default Price;
