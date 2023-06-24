const express = require("express");
const router = express.Router();
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// Firebase app is passed as a parameter from index.js
module.exports = (app) => {
    const auth = getAuth(app);

    // POST request to handle login
    router.get("/", async (req, res) => {
      return res.json("Hello")
    });

    return router;
};
