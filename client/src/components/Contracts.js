import React, { useState, useEffect } from 'react';
import './Contracts.css';
import { List, ListItem, ListItemText, Modal, Paper } from '@material-ui/core';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3005/contracts")
      .then(response => response.json())
      .then(data => setContracts(data));
  }, []);

  const handleOpen = (contract) => {
    setSelectedContract(contract);
  };

  const handleClose = () => {
    setSelectedContract(null);
  };

  return (
    <Paper className="contracts-container">
      <h3>Contracts</h3>
      <List>
        {contracts.map(contract => (
          <ListItem button key={contract.id} onClick={() => handleOpen(contract)}>
            <ListItemText primary={contract.id} />
          </ListItem>
        ))}
      </List>
      {selectedContract && (
        <Modal open={true} onClose={handleClose}>
          <div className="modal-content">
            <h4>ID: {selectedContract.id}</h4>
            <h4>Protocol: {selectedContract.protocol}</h4>
            <ul>
              {selectedContract.deployments.map(deployment => (
                <li key={deployment}>
                  <a href={`https://etherscan.io/tx/${deployment}`} target="_blank" rel="noreferrer">
                    {deployment}
                  </a>
                </li>
              ))}
            </ul>
            <a href={selectedContract.url} target="_blank" rel="noreferrer">Link</a>
          </div>
        </Modal>
      )}
    </Paper>
  );
}

export default Contracts;
