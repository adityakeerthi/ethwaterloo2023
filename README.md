# SimpliAudit

#### A post-audit deployment monitoring tool for auditors

## Description 
This project aims to monitor deployments on different protocols for both simple and upgradable smart contracts. Our approach was pretty simple - create a dashboard for auditors that will update automatically when there is a new deployment from a common deployer. We consider a common deployer to be an address that deploys smart contracts through the top 20 highest defi protocols. Most of the deployments on-chain will be happening through these protocols, so we collected all the addresses and stored them in a database. SimpliAudit enhances auditors from finding potential audits and tracking deployments throughout the auditing stage in a simple manner.

## How we built it
We built SimpliAudit with a very intuitive structure - making simplicity our priority. We used the Etherscan API to monitor deployments from top defi protocol addresses and find difference between audits and post-audit deployments. We wrote a script in Python that parses the API request into a cleaner JSON object that will be sent to the frontend. Our frontend is built with React and designed with MaterialUI with an Express backend. To manage the deployments and keep track of the audits, we used Firebase Firestore and wrote multiple functions on our backend server with Node. Simple authentication with Firebase Auth was used to keep track of users and the audits they were tackling. A notable gimmick we used to process the Etherscan request was parsing the recent deployments with Python and writing to a JSON file on the server that would later be parsed again with some Node code to be sent to the frontend.

### Tech stack:
Node.js, Python, Solidity, React, CSS, MaterialUI, Alchemy, Hardhat, ethers.js, JavaScript, TypeScript, Express, Etherscan API, etc.
