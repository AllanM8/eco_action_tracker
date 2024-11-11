import React from 'react';
import './ActionList.css'; // Importing new CSS

const ActionList = ({ actions, addAction }) => {
  return (
    <div className="action-list-container">
      <h2>🌿 Choose Your Eco-Friendly Actions 🌿</h2>
      <div className="action-list">
        {actions.map((action) => (
          <div key={action.id} className="action-card">
            <h3>{action.name}</h3>
            <p>{action.co2} kg CO2</p>
            <button onClick={() => addAction(action)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionList;
