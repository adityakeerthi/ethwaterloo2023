import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Contracts from './Components/Contracts';
import Deployments from './Components/Deployments';

function App() {
  const [contracts, setContracts] = useState([]);
  const [deployments, setDeployments] = useState([]);
  // user
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3005/contracts")
      .then(response => response.json())
      .then(data => setContracts(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3005/deployments")
      .then(response => response.json())
      .then(data => setDeployments(data));
  }, []);

  const refreshDeployments = () => {
    fetch("http://localhost:3005/deployments")
      .then(response => response.json())
      .then(data => setDeployments(data));
  };

  return (
    <div className="app">
      <Navbar contracts={contracts} deployments={deployments} setContracts={setContracts} setDeployments={setDeployments} user={user} setUser={setUser}/>
      <div className="content-container">
        <Contracts contracts={contracts} />
        <Deployments deployments={deployments} user={user} onStatusUpdate={refreshDeployments}/>
      </div>
    </div>
  );
}

export default App;
