const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();

const serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://restapi-81f42.firebaseio.com",
});
app.use(cors({origin: true}));
app.get("/hello", (req, res) => {
  return res.status(200).json({Message: "Hello"});
});
app.use(require("./routes/books.routes"));
exports.app = functions.https.onRequest(app);
