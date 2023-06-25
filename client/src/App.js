import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Contracts from './Components/Contracts';
import Deployments from './Components/Deployments';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Contracts />
        <Deployments />
      </div>
    </div>
  );
}

export default App;
