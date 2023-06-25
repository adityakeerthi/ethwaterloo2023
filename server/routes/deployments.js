const express = require("express");
const router = express.Router();

module.exports = (firebase) => {
	const { admin } = firebase;

	router.post("/", async (req, res) => {
		const { auth_token } = req.cookies;
		const { deploymentHash, status } = req.body;

		if (!auth_token) {
			return res.status(401).send("Unauthorized: No token provided");
		}

		if (!deploymentHash || typeof deploymentHash !== "string") {
			return res.status(400).send("Invalid deployment hash provided");
		}

		try {
			// Verify the token
			const decodedToken = await admin.auth().verifyIdToken(auth_token);

			// Get the user document
			const userDoc = await admin.firestore().collection("users").doc(decodedToken.uid).get();

			// Check if the user is an auditor
			if (userDoc.exists && userDoc.data().isAuditor) {
				// Update the deployment status in Firestore
				const deploymentRef = admin
					.firestore()
					.collection("deployments")
					.doc(deploymentHash);
				await deploymentRef.update({ status });

				return res.status(200).send("Deployment status updated successfully");
			} else {
				return res.status(403).send("Forbidden: User is not an auditor");
			}
		} catch (error) {
			return res.status(500).send(error.message);
		}
	});

	// New GET route to fetch all deployments
	router.get("/", async (req, res) => {
		try {
			// Reference to the deployments collection
			const deploymentsRef = admin.firestore().collection("deployments");

			// Retrieve all documents from the deployments collection
			const snapshot = await deploymentsRef.get();

			// Array to store the deployment data
			let deployments = [];

			// Loop through each document and store its data in the deployments array
			snapshot.forEach((doc) => {
				deployments.push({ id: doc.id, ...doc.data() });
			});

			// Send the deployments array as the response
			res.status(200).json(deployments);
		} catch (error) {
			// Send an error response in case of failure
			res.status(500).send(error.message);
		}
	});

	return router;
};
