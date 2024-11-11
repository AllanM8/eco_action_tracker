import './App.css';
import React, { useState, useEffect } from 'react';
import ActionList from './components/ActionList';
import ImpactSummary from './components/ImpactSummary';
import ProgressBar from './components/ProgressBar';

const actionsData = [
  { id: 1, name: 'Reduce meat consumption (e.g., Meatless Monday)', co2: 1.2 },
  { id: 2, name: 'Take public transport', co2: 2.6 },
  { id: 3, name: 'Eat a plant-based meal', co2: 0.8 },
  { id: 4, name: 'Use energy-efficient light bulbs', co2: 0.1 },
  { id: 5, name: 'Recycle paper', co2: 0.2 },
  { id: 6, name: 'Use a reusable shopping bag', co2: 0.2 },
  { id: 7, name: 'Use reusable utensils instead of plastic', co2: 0.3 },
  { id: 8, name: 'Choose eco-friendly cleaning products', co2: 0.2 },
  { id: 9, name: 'Avoid single-use plastic', co2: 0.3 },
];

function App() {
  const [trackedActions, setTrackedActions] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    // Load saved actions from localStorage on initial load
    const savedActions = JSON.parse(localStorage.getItem('trackedActions'));
    if (savedActions) {
      setTrackedActions(savedActions);
      setTotalCO2(savedActions.reduce((acc, action) => acc + action.co2 * action.count, 0));
    }
  }, []);

  useEffect(() => {
    // Persist tracked actions in localStorage
    localStorage.setItem('trackedActions', JSON.stringify(trackedActions));
    setTotalCO2(trackedActions.reduce((acc, action) => acc + action.co2 * action.count, 0));
  }, [trackedActions]);

  const addAction = (action) => {
    const existingAction = trackedActions.find((a) => a.id === action.id);
    if (existingAction) {
      setTrackedActions(
        trackedActions.map((a) =>
          a.id === action.id ? { ...a, count: a.count + 1 } : a
        )
      );
    } else {
      setTrackedActions([...trackedActions, { ...action, count: 1 }]);
    }
  };

  const removeAction = (id) => {
    setTrackedActions(trackedActions.filter((action) => action.id !== id));
  };

  const clearActions = () => {
    setTrackedActions([]);
  };

  const ecoTip = () => {
    if (totalCO2 > 5) return "Great job! You're making a significant impact.";
    if (totalCO2 > 2) return 'Consider using renewable energy to increase your impact!';
    return 'Keep going! Small actions add up to make a big difference.';
  };

  return (
    <div className="app-container">
      <h1>🌍 Eco Action Tracker 🌍</h1>
      <ActionList actions={actionsData} addAction={addAction} />
      <ImpactSummary
        actions={trackedActions}
        totalCO2={totalCO2}
        removeAction={removeAction}
        clearActions={clearActions}
        ecoTip={ecoTip()}
      />
      <ProgressBar progress={totalCO2 / 10} />
    </div>
  );
}

export default App;
