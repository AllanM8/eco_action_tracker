import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ totalCO2 }) => {
  const targetCO2 = 5; // Set a goal for CO2 savings, e.g., 5kg
  const percentage = Math.min((totalCO2 / targetCO2) * 100, 100); // Ensure percentage doesn't exceed 100

  const barColor = () => {
    if (percentage < 30) return 'red';
    if (percentage < 60) return 'orange';
    return 'green';
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%`, backgroundColor: barColor() }}>
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

export default ProgressBar;
