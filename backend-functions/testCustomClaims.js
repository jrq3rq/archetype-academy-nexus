const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./service-account-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to set custom claims
async function setUserCustomClaims(uid, claims) {
  try {
    await admin.auth().setCustomUserClaims(uid, claims);
    console.log(`Custom claims set for user ${uid}:`, claims);
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
}

// Replace with the UID of the user and the claims you want to set
setUserCustomClaims("9RJ9w3ywWUMN5yHxceA01OHvZWC3", { role: "admin" });
