const express = require("express");
const bodyParser = require("body-parser");

process.on("uncaughtException", (err, origin) => {
    console.log("Uncaught Exception:", err, "Origin", origin);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => { 
    res.send("test");
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});