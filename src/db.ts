var admin = require("firebase-admin");
import configs from "./config";

const serviceAccount = JSON.parse(configs.serviceAccount);
const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = db;
