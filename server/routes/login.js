const express = require("express");
const router = express.Router();
const { signInWithEmailAndPassword } = require("firebase/auth");

module.exports = (firebase) => {
	const { auth, admin } = firebase;

	// POST request to handle login
	router.post("/", async (req, res) => {
		const { email, password } = req.body;

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const token = await userCredential.user.getIdToken();

			// Set cookie
			res.cookie("auth_token", token, { httpOnly: true, sameSite: "strict" });
			res.json({ message: "Logged in successfully" });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	});

	// POST request to handle login with cookie
	router.post("/cookie", async (req, res) => {
		const { auth_token } = req.cookies;

		if (!auth_token) {
			return res.status(401).json({ message: "Not authenticated" });
		}

		try {
			const decodedToken = await admin.auth().verifyIdToken(auth_token);
			req.user = decodedToken;
			res.json({ message: "Logged in successfully" });
		} catch (error) {
			console.error("Error verifying token:", error);
			return res.status(401).json({ message: "Not authenticated" });
		}
	});

	return router;
};
