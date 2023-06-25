const express = require("express");
const bodyParser = require("body-parser");

// Import the Firebase app
const firebase = require("./firebase");

// Import routes
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
const auditRoutes = require("./routes/audit");

require("./documents");

process.on("uncaughtException", (err, origin) => {
    console.log("Uncaught Exception:", err, "Origin", origin);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes
app.use("/login", loginRoutes(firebase));
app.use("/signup", signupRoutes(firebase));
app.use("/audit", auditRoutes);

app.get("/", (req, res) => {
    res.send("test");
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});