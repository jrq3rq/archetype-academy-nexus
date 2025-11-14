const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Ensure your GOOGLE_APPLICATION_CREDENTIALS env variable is set
  projectId: "archetype-academy-nexus",
});

async function assignAdminRole() {
  const uid = "qYv99zkaSnMAn2FyaByvc8dqSPP2"; // Replace with the UID of the user
  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    console.log(`Admin role assigned successfully to user with UID: ${uid}`);
  } catch (error) {
    console.error("Error assigning admin role:", error);
  }
}

assignAdminRole();
