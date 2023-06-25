const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config();

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

// Export initialized auth and firestore instances
module.exports = {
	auth: getAuth(app),
	db: getFirestore(app),
	admin: admin,
};
