import React, { useState, useEffect } from 'react';
import './Deployments.css';
import { List, ListItem, ListItemText, Modal, Paper } from '@material-ui/core';

function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3005/deployments")
      .then(response => response.json())
      .then(data => setDeployments(data));
  }, []);

  const handleOpen = (deployment) => {
    setSelectedDeployment(deployment);
  };

  const handleClose = () => {
    setSelectedDeployment(null);
  };

  return (
    <Paper className="deployments-container">
      <h3>Deployments</h3>
      <List>
        {deployments.map(deployment => (
          <ListItem button key={deployment.id} onClick={() => handleOpen(deployment)}>
            <ListItemText primary={deployment.id} />
          </ListItem>
        ))}
      </List>
      {selectedDeployment && (
        <Modal open={true} onClose={handleClose}>
          <div className="modal-content">
            <h4>ID: {selectedDeployment.id}</h4>
            <h4>Date: {selectedDeployment.date}</h4>
            <h4>Protocol: {selectedDeployment.protocol}</h4>
            <h4>Contract: {selectedDeployment.contract}</h4>
            <h4>Status: {selectedDeployment.status}</h4>
            <a href={selectedDeployment.link} target="_blank" rel="noreferrer">View on Etherscan</a>
          </div>
        </Modal>
      )}
    </Paper>
  );
}

export default Deployments;
