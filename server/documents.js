const fs = require('fs');
const path = require('path');
const { collection, doc, setDoc } = require("firebase/firestore");
const firebase = require("./firebase");

const { db } = firebase;
const deploymentsFilePath = path.join(__dirname, './', 'deployments.json');

let lastUpdated = null;

function watchDeployments() {
  setInterval(async () => {
    const rawData = fs.readFileSync(deploymentsFilePath, 'utf-8');
    const deployments = JSON.parse(rawData);

    for (const deployment of deployments) {
      if (lastUpdated === null || Number(deployment.timeStamp) > lastUpdated) {
        const contract = deployment.contractAddress;
        const date = new Date(Number(deployment.timeStamp) * 1000).toISOString();
        const link = `https://etherscan.io/tx/${deployment.hash}`;
        const status = 'invalid';

        const deploymentRef = doc(collection(db, 'deployments'), deployment.hash);
        await setDoc(deploymentRef, { contract, date, link, status });

        lastUpdated = Number(deployment.timeStamp);
      }
    }
  }, 5000); // Check every 5 seconds
}

watchDeployments();
