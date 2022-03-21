import React from 'react';
import './App.css';
import { ThreeProvider } from './components/ThreeContext';

function App() {
  return (
    <div className="App">
      <ThreeProvider></ThreeProvider>
    </div>
  );
}

export default App;
