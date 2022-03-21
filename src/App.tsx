import React from 'react';
import './App.css';
import { Starts } from './components/effects/Stars';
import { ThreeProvider } from './components/ThreeContext';

function App() {
  return (
    <div className="App">
      <ThreeProvider>
        <Starts />
      </ThreeProvider>
    </div>
  );
}

export default App;
