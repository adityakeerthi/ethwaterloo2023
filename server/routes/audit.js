const express = require("express");
const router = express.Router();
const { collection, doc, setDoc, updateDoc, arrayUnion } = require("firebase/firestore");

module.exports = (firebase) => {
	const { admin, db } = firebase;

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
				const deploymentRef = doc(collection(db, "deployments"), deploymentHash);
        await updateDoc(deploymentRef, { status: status });
        
				return res.status(200).send("Deployment status updated successfully");
			} else {
				return res.status(403).send("Forbidden: User is not an auditor");
			}
		} catch (error) {
			return res.status(500).send(error.message);
		}
	});

	return router;
};
