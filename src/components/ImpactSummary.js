import React from 'react';
import ProgressBar from './ProgressBar';
import './ImpactSummary.css';

const ImpactSummary = ({ actions, totalCO2, removeAction, clearActions, ecoTip }) => {
  const calculateTreesSaved = (co2) => Math.floor(co2 / 10);

  return (
    <div className="impact-summary-container">
      <h2>🌍 Your Eco Impact</h2>
      {actions.length === 0 ? (
        <p className="no-actions">No actions tracked yet. Start adding eco actions!</p>
      ) : (
        <>
          <ul className="tracked-actions">
            {actions.map((action) => (
              <li key={action.id} className="action-list-item">
                <span>{action.name}</span> 
                <span>x {action.count} = {action.co2 * action.count} kg CO2</span>
                <button onClick={() => removeAction(action.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </li>
            ))}
          </ul>
          <button className="clear-button" onClick={clearActions}>
            <i className="fas fa-sync-alt"></i> Clear All
          </button>

          <ProgressBar totalCO2={totalCO2} />
          
          <div className="impact-result">
            <strong>Total CO2 Saved: {totalCO2.toFixed(1)} kg</strong>
            <p>You've saved the equivalent of {calculateTreesSaved(totalCO2)} trees planted!</p>
            <p>{ecoTip}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImpactSummary;
