import React, { useState, useEffect } from 'react';
import './Contracts.css';
import { List, ListItem, ListItemText, Modal, Paper } from '@material-ui/core';

function Contracts({ contracts }) {
  const [selectedContract, setSelectedContract] = useState(null);

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
            <h4>Contract Address: <a href={selectedContract.contractLink} target="_blank" rel="noreferrer">{selectedContract.id}</a></h4>
            <h4>Protocol: {selectedContract.protocol}</h4>
            <h4>Deployments:</h4>
            <ul>
              {selectedContract.deployments.map(deployment => (
                <li key={deployment}>
                  <a href={`https://etherscan.io/tx/${deployment}`} target="_blank" rel="noreferrer">
                    {deployment}
                  </a>
                </li>
              ))}
            </ul>
            
          </div>
        </Modal>
      )}
    </Paper>
  );
}

export default Contracts;
