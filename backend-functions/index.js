const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  }),
});

const firestore = admin.firestore();

// Set User Role
exports.setUserRole = functions.https.onCall(async (data, context) => {
  const { uid, role } = data;

  if (!context.auth || !context.auth.token) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be authenticated to assign roles."
    );
  }

  if (!uid || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Both 'uid' and 'role' are required."
    );
  }

  try {
    // Check if there are any admins in the system
    const adminSnapshot = await firestore
      .collection("locations")
      .where("role", "==", "admin")
      .limit(1)
      .get();

    const isFirstAdmin = adminSnapshot.empty;

    // Allow assigning roles if:
    // - The user is an admin
    // - OR no admins exist in the system (first user setup)
    if (!isFirstAdmin && context.auth.token.role !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Only admins can assign roles."
      );
    }

    // Assign custom user claims
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Role '${role}' assigned to user '${uid}'.`);

    // Update Firestore with the role
    const userDocRef = firestore.collection("locations").doc(uid);
    await userDocRef.set({ role }, { merge: true });

    return {
      message: `Role '${role}' successfully assigned to user '${uid}'.`,
    };
  } catch (error) {
    console.error("Error assigning role:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to assign role. Please try again later."
    );
  }
});

// Generate Custom Token
exports.generateCustomToken = functions.https.onCall(async (data, context) => {
  console.log("Incoming data for generateCustomToken:", data);

  if (!data || !data.uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID is required."
    );
  }

  try {
    // Get the user record
    const userRecord = await admin.auth().getUser(data.uid);
    if (!userRecord) {
      throw new functions.https.HttpsError(
        "not-found",
        "User with the given UID does not exist."
      );
    }

    // Get Firestore role for the user
    const userDocRef = firestore.collection("locations").doc(data.uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists || !userDoc.data().role) {
      throw new functions.https.HttpsError(
        "not-found",
        "User role not found in Firestore."
      );
    }

    // Generate a custom token
    const customToken = await admin.auth().createCustomToken(data.uid, {
      role: userDoc.data().role,
    });
    console.log("Custom token generated successfully.");
    return { token: customToken };
  } catch (error) {
    console.error("Error generating custom token:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to generate custom token."
    );
  }
});

// Check User Role
exports.checkUserRole = functions.https.onCall((data, context) => {
  console.log("Incoming data for checkUserRole:", data);

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const role = context.auth.token.role || "No role assigned";
  console.log(`User role: ${role}`);
  return { role };
});

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// require("dotenv").config();
// const cors = require("cors")({ origin: true });

// // Load environment variables
// const var1 =
//   process.env.env_var1 || functions.config().env?.var1 || "default_var1";
// const var2 =
//   process.env.env_var2 || functions.config().env?.var2 || "default_var2";

// console.log("VAR1:", var1);
// console.log("VAR2:", var2);
// console.log("functions.config().env:", functions.config().env);

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId:
//       process.env.GOOGLE_PROJECT_ID || functions.config().env?.project_id,
//     privateKey: (
//       process.env.GOOGLE_PRIVATE_KEY ||
//       functions.config().env?.private_key ||
//       ""
//     ).replace(/\\n/g, "\n"),
//     clientEmail:
//       process.env.GOOGLE_CLIENT_EMAIL || functions.config().env?.client_email,
//   }),
// });

// console.log(
//   "Project ID:",
//   process.env.GOOGLE_PROJECT_ID || functions.config().env?.project_id
// );
// console.log(
//   "Client Email:",
//   process.env.GOOGLE_CLIENT_EMAIL || functions.config().env?.client_email
// );
// console.log(
//   "Private Key Exists:",
//   Boolean(process.env.GOOGLE_PRIVATE_KEY || functions.config().env?.private_key)
// );

// // Generate Custom Token
// exports.generateCustomToken = functions.https.onCall(async (data, context) => {
//   console.log("Incoming data for generateCustomToken:", data);

//   if (!data || !data.uid) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "UID is required."
//     );
//   }

//   try {
//     // Get the user record
//     const userRecord = await admin.auth().getUser(data.uid);
//     if (!userRecord) {
//       throw new functions.https.HttpsError(
//         "not-found",
//         "User with the given UID does not exist."
//       );
//     }

//     // Get Firestore role for the user
//     const userDocRef = admin.firestore().collection("locations").doc(data.uid);
//     const userDoc = await userDocRef.get();

//     if (!userDoc.exists || !userDoc.data().role) {
//       throw new functions.https.HttpsError(
//         "not-found",
//         "User role not found in Firestore."
//       );
//     }

//     // Generate a custom token
//     const customToken = await admin.auth().createCustomToken(data.uid, {
//       role: userDoc.data().role,
//     });
//     console.log("Custom token generated successfully.");
//     return { token: customToken };
//   } catch (error) {
//     console.error("Error generating custom token:", error);
//     throw new functions.https.HttpsError(
//       "internal",
//       "Unable to generate custom token."
//     );
//   }
// });

// // Set User Role
// exports.setUserRole = functions.https.onCall(async (data, context) => {
//   const { uid, role } = data;

//   if (!context.auth || !context.auth.token) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "You must be authenticated to assign roles."
//     );
//   }

//   if (!uid || !role) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Both 'uid' and 'role' are required."
//     );
//   }

//   try {
//     // Check if any admins already exist
//     const adminsSnapshot = await admin
//       .firestore()
//       .collection("locations")
//       .where("role", "==", "admin")
//       .get();

//     // Allow assigning roles only if caller is an admin or no admins exist
//     if (adminsSnapshot.size > 0 && context.auth.token.role !== "admin") {
//       throw new functions.https.HttpsError(
//         "permission-denied",
//         "Only admins can assign roles."
//       );
//     }

//     // Assign custom claims
//     await admin.auth().setCustomUserClaims(uid, { role });
//     console.log(`Role '${role}' assigned to user '${uid}'.`);

//     // Update Firestore
//     const userDocRef = admin.firestore().collection("locations").doc(uid);
//     await userDocRef.set({ role }, { merge: true });
//     console.log(`Firestore updated for user '${uid}' with role '${role}'.`);

//     return {
//       message: `Role '${role}' successfully assigned to user '${uid}'.`,
//     };
//   } catch (error) {
//     console.error("Error assigning role:", error);
//     throw new functions.https.HttpsError("internal", "Failed to assign role.");
//   }
// });

// // Check User Role
// exports.checkUserRole = functions.https.onCall((data, context) => {
//   console.log("Incoming data for checkUserRole:", data);

//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "Request must be authenticated."
//     );
//   }

//   const role = context.auth.token.role || "No role assigned";
//   console.log(`User role: ${role}`);
//   return { role };
// });

// // index.js in backend-functions folder
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

// require("dotenv").config();

// // Initialize Firebase Admin SDK with environment variables
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.GOOGLE_PROJECT_ID, // Matches GOOGLE_PROJECT_ID
//     privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Matches GOOGLE_PRIVATE_KEY
//     clientEmail: process.env.GOOGLE_CLIENT_EMAIL, // Matches GOOGLE_CLIENT_EMAIL
//   }),
//   databaseURL: "https://archetype-academy-nexus-default-rtdb.firebaseio.com", // Ensure this matches your database URL
// });

// // Set User Role Function

// const cors = require("cors")({ origin: true });

// exports.generateCustomToken = functions.https.onCall(async (data, context) => {
//   console.log("Incoming data for generateCustomToken:", data);

//   if (!data.uid) {
//     console.error("Missing UID in generateCustomToken:", data);
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "UID is required."
//     );
//   }

//   const { uid } = data;

//   if (!uid) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "UID is required."
//     );
//   }

//   try {
//     // Optional: Verify if UID exists in Firestore or Firebase Auth
//     const userRecord = await admin.auth().getUser(uid);
//     if (!userRecord) {
//       throw new functions.https.HttpsError(
//         "not-found",
//         "User with the given UID does not exist."
//       );
//     }

//     // Generate custom token
//     const customToken = await admin.auth().createCustomToken(uid);
//     return { token: customToken };
//   } catch (error) {
//     console.error("Error generating custom token:", error);
//     throw new functions.https.HttpsError(
//       "internal",
//       "Unable to generate custom token."
//     );
//   }
// });

// exports.setUserRole = functions.https.onCall(async (data, context) => {
//   console.log("Incoming data for setUserRole:", data);
//   console.log("Context auth:", context.auth);

//   if (!data.uid || !data.role) {
//     console.error("Invalid request: Missing 'uid' or 'role'", data);
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Request must include 'uid' and 'role'."
//     );
//   }

//   try {
//     // Log only necessary parts of the data and context
//     console.log("Incoming data for setUserRole:", {
//       uid: data.uid,
//       role: data.role,
//     });

//     // Validate input
//     if (!data.uid || !data.role) {
//       console.error("Invalid request: Missing 'uid' or 'role'", data);
//       throw new functions.https.HttpsError(
//         "invalid-argument",
//         "Request must include 'uid' and 'role'."
//       );
//     }

//     // Validate the admin role of the caller
//     if (!context.auth || context.auth.token.role !== "admin") {
//       console.error("Permission denied. Caller is not an admin.");
//       throw new functions.https.HttpsError(
//         "permission-denied",
//         "Only admins can assign roles."
//       );
//     }

//     if (!context.auth) {
//       console.error("Unauthenticated request.");
//       throw new functions.https.HttpsError(
//         "unauthenticated",
//         "This function must be called while authenticated."
//       );
//     }

//     const { uid, role } = data;

//     // Assign custom claims
//     await admin.auth().setCustomUserClaims(uid, { role });
//     console.log(`Role '${role}' assigned to user '${uid}'.`);
//     return { message: `Role '${role}' successfully assigned.` };
//     // Proceed with assigning the role...
//   } catch (error) {
//     console.error("Unhandled error in setUserRole:", error.message);
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// // Get User Role Function
// exports.getUserRole = functions.https.onCall(async (data, context) => {
//   console.log("Incoming data:", data); // Log the incoming data

//   // Validate input
//   if (!data.uid) {
//     console.error("Invalid request: Missing 'uid'");
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Request must include 'uid'."
//     );
//   }

//   // Ensure the request is authenticated
//   if (!context.auth) {
//     console.error("Unauthenticated request.");
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "Request must be authenticated."
//     );
//   }
//   console.log("Caller authentication info:", context.auth); // Log caller authentication info

//   try {
//     const userRecord = await admin.auth().getUser(data.uid);
//     const role = userRecord.customClaims?.role || "No role assigned";
//     console.log(`Fetched role for user ${data.uid}: ${role}`);
//     return { role };
//   } catch (error) {
//     console.error("Error fetching user role:", error);
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// // Check User Role Function
// exports.checkUserRole = functions.https.onCall((data, context) => {
//   console.log("Incoming data:", data); // Log the incoming data

//   // Ensure the request is authenticated
//   if (!context.auth) {
//     console.warn("Unauthenticated request.");
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "Request must be authenticated."
//     );
//   }
//   console.log("Caller authentication info:", context.auth); // Log caller authentication info

//   const role = context.auth.token.role || "User has no role assigned";
//   console.log("User role:", role);

//   return { role };
// });

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// require("dotenv").config();

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.GOOGLE_PROJECT_ID,
//     privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
//   }),
// });

// console.log("Firebase Admin initialized successfully.");

// // Helper Function: Validate Admin Authentication
// const validateAdmin = (auth) => {
//   if (!auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "The function must be called while authenticated."
//     );
//   }
//   if (auth.token.role !== "admin") {
//     throw new functions.https.HttpsError(
//       "permission-denied",
//       "Only admins can perform this action."
//     );
//   }
// };

// // Generate Custom Token
// exports.generateCustomToken = functions.https.onCall(async (data, context) => {
//   if (!data || !data.uid) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Request must include a valid UID."
//     );
//   }

//   try {
//     const userRecord = await admin.auth().getUser(data.uid);
//     const customToken = await admin.auth().createCustomToken(userRecord.uid);
//     console.log(`Custom token generated for UID: ${data.uid}`);
//     return { token: customToken };
//   } catch (error) {
//     console.error("Error generating custom token:", error);
//     throw new functions.https.HttpsError(
//       "internal",
//       "Error generating custom token."
//     );
//   }
// });

// // Set User Role
// // exports.setUserRole = functions.https.onCall(async (data, context) => {
// //   console.log("setUserRole invoked with data:", data);

// //   try {
// //     validateAdmin(context.auth);

// //     const { uid, role } = data;
// //     if (!uid || !role) {
// //       throw new functions.https.HttpsError(
// //         "invalid-argument",
// //         "Request must include 'uid' and 'role'."
// //       );
// //     }

// //     await admin.auth().setCustomUserClaims(uid, { role });
// //     console.log(`Role '${role}' assigned to user '${uid}'.`);
// //     return { message: `Role '${role}' successfully assigned.` };
// //   } catch (error) {
// //     console.error("Error in setUserRole:", error.message);
// //     throw new functions.https.HttpsError("internal", error.message);
// //   }
// // });

// exports.setUserRole = functions.https.onCall(async (data, context) => {
//   console.log("setUserRole invoked with data:", data);

//   // Ensure the request is authenticated and the caller has admin privileges
//   if (!context.auth || context.auth.token.role !== "admin") {
//     console.error("Permission denied. Caller is not an admin.");
//     throw new functions.https.HttpsError("permission-denied", "Admins only.");
//   }

//   const { uid, role } = data;

//   if (!uid || !role) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Request must include 'uid' and 'role'."
//     );
//   }

//   try {
//     await admin.auth().setCustomUserClaims(uid, { role });
//     console.log(`Role '${role}' successfully assigned to user '${uid}'.`);
//     return { message: `Role '${role}' successfully assigned.` };
//   } catch (error) {
//     console.error("Error in setUserRole:", error.message);
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// // Get User Role
// exports.getUserRole = functions.https.onCall(async (data, context) => {
//   console.log("getUserRole invoked with data:", data);

//   if (!data || !data.uid) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Request must include 'uid'."
//     );
//   }

//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "Request must be authenticated."
//     );
//   }

//   try {
//     const userRecord = await admin.auth().getUser(data.uid);
//     const role = userRecord.customClaims?.role || "No role assigned";
//     console.log(`Fetched role for UID '${data.uid}': ${role}`);
//     return { role };
//   } catch (error) {
//     console.error("Error fetching user role:", error.message);
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// // Check User Role
// exports.checkUserRole = functions.https.onCall((data, context) => {
//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "Request must be authenticated."
//     );
//   }

//   const role = context.auth.token.role || "No role assigned";
//   console.log(`User role: ${role}`);
//   return { role };
// });
