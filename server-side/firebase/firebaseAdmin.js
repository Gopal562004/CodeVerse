const admin = require("firebase-admin");

// Load your service account key JSON file
const serviceAccount = require("../security/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "codeverse-3a59b.appspot.com", // Specify your storage bucket
});

const bucket = admin.storage().bucket();

module.exports = bucket;
