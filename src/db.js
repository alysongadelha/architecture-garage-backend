var admin = require("firebase-admin");
const configs = require("./config");

const serviceAccount = JSON.parse(configs.serviceAccount);
const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = db;
