const fs = require("fs");
const path = require("path");
const { collection, doc, setDoc, updateDoc, arrayUnion } = require("firebase/firestore");
const firebase = require("./firebase");

const { db } = firebase;
const deploymentsFilePath = path.join(__dirname, "./", "deployments.json");

function watchDeployments() {
	setInterval(async () => {
		const rawData = fs.readFileSync(deploymentsFilePath, "utf-8");
		const deployments = JSON.parse(rawData);

		for (const deployment of deployments) {
			const contract = deployment.contractAddress;
			const date = new Date(Number(deployment.timeStamp) * 1000).toISOString();
			const link = `https://etherscan.io/tx/${deployment.hash}`;
      const contractLink = `https://etherscan.io/address/${deployment.contractAddress}`;
			const status = "invalid";
      const protocol = deployment.protocol;

			// Add to deployments collection
			const deploymentRef = doc(collection(db, "deployments"), deployment.hash);
			await setDoc(deploymentRef, { contract, date, link, status, protocol });

			// Add hash to contracts collection under contractAddress
			const contractRef = doc(collection(db, "contracts"), contract);
			await setDoc(
				contractRef,
				{
					deployments: arrayUnion(deployment.hash),
          protocol: deployment.protocol,
          contractLink: contractLink,
				},
				{ merge: true }
			);
		}
	}, 5000); // Check every 5 seconds
}

watchDeployments();
