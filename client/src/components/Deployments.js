import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Deployments.css';
import { List, ListItem, ListItemText, Modal, Paper, FormControl, Select, MenuItem } from '@material-ui/core';

function Deployments({ deployments, user, onStatusUpdate }) {
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  const handleOpen = (deployment) => {
    setSelectedDeployment(deployment);
  };

  const handleClose = () => {
    setSelectedDeployment(null);
  };

  const handleAuditStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedDeployment(prevDeployment => ({
      ...prevDeployment,
      status: newStatus
    }));

    // Call the API to update the status for the selected deployment
    const { id } = selectedDeployment;
    callAuditEndpoint(id, newStatus);
  };

  const callAuditEndpoint = (id, newStatus) => {
    axios.post('http://localhost:3005/audit', {
      deploymentHash: id,
      status: newStatus,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Handle the response if needed
  
        // Call the callback function to refresh deployments in App.js
        onStatusUpdate();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const renderAuditStatus = (deployment) => {
    if (user) {
      return (
        <FormControl>
          <Select value={deployment.status} onChange={handleAuditStatusChange}>
            <MenuItem value="invalid">Invalid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="valid">Valid</MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      return <span>{deployment.status}</span>;
    }
  };

  return (
    <Paper className="deployments-container">
      <h3>Deployments</h3>
      <List>
        {deployments.map(deployment => (
          <ListItem button key={deployment.id} onClick={() => handleOpen(deployment)}>
            <ListItemText primary={deployment.id} />
            {deployment.status}
          </ListItem>
        ))}
      </List>
      {selectedDeployment && (
        <Modal open={true} onClose={handleClose}>
          <div className="modal-content">
            <h4>Deployment Address: <a href={selectedDeployment.link} target="_blank" rel="noreferrer">{selectedDeployment.id}</a></h4>
            <h4>Date Deployed: {new Date(selectedDeployment.date).toLocaleString()}</h4>
            <h4>Protocol: {selectedDeployment.protocol}</h4>
            <h4>
              Audit Status: {renderAuditStatus(selectedDeployment)}
            </h4>
          </div>
        </Modal>
      )}
    </Paper>
  );
}

export default Deployments;
