const express = require("express");
const router = express.Router();
const { createUserWithEmailAndPassword } = require("firebase/auth");

module.exports = (firebase) => {
    const { auth, db } = firebase;

    // POST request to handle signup
    router.post("/", async (req, res) => {
        const { email, password } = req.body;

        try {
            // Create user using Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a document in Firestore with user's email
            const userRef = db.collection('users').doc(user.uid);
            await userRef.set({ email });

            res.json({ message: "Account created successfully", user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};
