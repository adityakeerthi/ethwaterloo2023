const express = require("express");
const router = express.Router();
const { signInWithEmailAndPassword } = require("firebase/auth");

module.exports = (firebase) => {
    const { auth } = firebase;

    // POST request to handle login
    router.post("/", async (req, res) => {
        const { email, password } = req.body;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            res.json({ message: "Logged in successfully", user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};
