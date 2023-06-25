const express = require("express");
const router = express.Router();
const { createUserWithEmailAndPassword } = require("firebase/auth");
const { collection, doc, setDoc } = require("firebase/firestore");

module.exports = (firebase) => {
	const { auth, db } = firebase;

	// POST request to handle signup
	router.post("/", async (req, res) => {
		const { email, name, password, auditRequest, companyEmail, companyName, phoneNumber } =
			req.body;

		try {
			// Create user using Firebase Authentication
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Create a document in Firestore with user's email
			const userRef = doc(collection(db, "users"), user.uid);
			await setDoc(userRef, {
				email,
				name,
				auditRequest,
				isAuditor: auditRequest,
				companyEmail,
				companyName,
				phoneNumber,
				audits: { inProgress: [], completed: [] },
			});

			// Set cookie
			res.cookie("auth_token", token, { httpOnly: true, sameSite: "strict" });
			res.json({ message: "Logged in successfully" });

			res.json({ message: "Account created successfully", user });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	});

	return router;
};
