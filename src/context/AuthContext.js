import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, googleProvider } from "../services/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to assign the default role of 'admin'
  const assignDefaultAdminRole = async (uid) => {
    try {
      const userDocRef = doc(firestore, "locations", uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || !userDoc.data().role) {
        await setDoc(
          userDocRef,
          { role: "admin" },
          { merge: true } // Ensure other data remains intact
        );
        console.log(`Assigned default admin role to user: ${uid}`);
      }
    } catch (error) {
      console.error("Error assigning default admin role:", error);
    }
  };

  // Effect to handle user state and role assignment
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);

      if (firebaseUser) {
        try {
          // Refresh ID token and fetch user role
          const idTokenResult = await firebaseUser.getIdTokenResult(true);
          let role = idTokenResult.claims.role;

          // Assign default role of 'admin' if no role exists
          if (!role) {
            role = "admin";
            await assignDefaultAdminRole(firebaseUser.uid);
          }

          // Update role in state
          setUserRole(role || "admin");
          console.log("User role:", role);

          // Ensure Firestore user document exists
          const userDocRef = doc(firestore, "locations", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            // Create Firestore document only if it doesn't exist
            const documentData = {
              locationName: firebaseUser.displayName || "Default Location",
              contactPerson: firebaseUser.displayName || "Default Contact",
              email: firebaseUser.email,
              address: "Default Address",
              billingAddress: "Default Billing Address",
              billingCycle: "monthly",
              subscriptionPlan: "Standard",
              locationType: "Default Type",
              createdAt: new Date(),
              role: "admin", // Explicitly set default role to 'admin'
            };
            await setDoc(userDocRef, documentData, { merge: true });
            console.log("Created user document in Firestore:", documentData);
          } else {
            console.log("User document already exists in Firestore.");
          }
        } catch (error) {
          console.error("Error in AuthContext:", error);
          setUserRole(null); // Ensure userRole state resets on failure
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return unsubscribe;
  }, []);

  // Sign-in method
  const signIn = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-out method
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, isLoading, signIn, signOut: signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// // import React, { createContext, useState, useEffect, useContext } from "react";
// // import { auth, googleProvider, firestore } from "../services/firebaseConfig";
// // import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// // import { doc, getDoc, setDoc } from "firebase/firestore";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
// //       setUser(firebaseUser);
// //       setIsLoading(false);

// //       if (firebaseUser) {
// //         const userDocRef = doc(firestore, "locations", firebaseUser.uid);
// //         const userDoc = await getDoc(userDocRef);

// //         if (!userDoc.exists()) {
// //           // Document doesn't exist, create it
// //           await setDoc(userDocRef, {
// //             locationName: "Default Location",
// //             contactPerson: firebaseUser.displayName || "Default Contact",
// //             email: firebaseUser.email,
// //             address: "Default Address",
// //             billingAddress: "Default Billing Address",
// //             billingCycle: "monthly",
// //             subscriptionPlan: "Standard",
// //             locationType: "Default Type",
// //             createdAt: new Date(),
// //           });
// //           console.log("New document created for user:", firebaseUser.uid);
// //         } else {
// //           console.log("Document already exists for user:", firebaseUser.uid);
// //         }
// //       }
// //     });

// //     return unsubscribe;
// //   }, []);

// //   const signIn = async () => {
// //     try {
// //       setIsLoading(true);
// //       await signInWithPopup(auth, googleProvider);
// //     } catch (error) {
// //       console.error("Error during sign-in:", error);
// //       setIsLoading(false);
// //     }
// //   };

// //   const signOutUser = async () => {
// //     try {
// //       await signOut(auth);
// //       setUser(null);
// //     } catch (error) {
// //       console.error("Error during sign-out:", error);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{ user, isLoading, signIn, signOut: signOutUser }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// // src/context/AuthContext.js

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { auth, googleProvider, firestore } from "../services/firebaseConfig";
// import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setUser(firebaseUser);
//       setIsLoading(false);

//       if (firebaseUser) {
//         const userDocRef = doc(firestore, "locations", firebaseUser.uid);
//         const userDoc = await getDoc(userDocRef);

//         if (!userDoc.exists()) {
//           // Only create a default document if it doesn't exist already
//           await setDoc(userDocRef, {
//             locationName: "Default Location",
//             contactPerson: firebaseUser.displayName || "Default Contact",
//             email: firebaseUser.email,
//             address: "Default Address",
//             billingAddress: "Default Billing Address",
//             billingCycle: "monthly",
//             subscriptionPlan: "Standard",
//             locationType: "Default Type",
//             createdAt: new Date(),
//           });
//           console.log("New document created for user:", firebaseUser.uid);
//         } else {
//           console.log("Document already exists for user:", firebaseUser.uid);
//         }
//       }
//     });

//     return unsubscribe;
//   }, []);

//   const signIn = async () => {
//     try {
//       setIsLoading(true);
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       setIsLoading(false);
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isLoading, signIn, signOut: signOutUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// src/context/AuthContext.js

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { auth, googleProvider } from "../services/firebaseConfig";
// import {
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
//   getAuth,
// } from "firebase/auth";
// import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
// import { firestore } from "../services/firebaseConfig";
// import { getFunctions, httpsCallable } from "firebase/functions";

// const AuthContext = createContext();

// // Refresh user's role from token claims
// export const refreshUserRole = async () => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//     throw new Error("No user is currently signed in.");
//   }

//   const idTokenResult = await user.getIdTokenResult(true); // Force refresh
//   return idTokenResult.claims.role || null; // Return the role if it exists
// };

// // Assign a role to a user
// export const assignUserRole = async (uid, role) => {
//   const functions = getFunctions();
//   const setUserRole = httpsCallable(functions, "setUserRole");

//   // Ensure payload is logged and verified
//   if (!uid || !role) {
//     console.error("UID or Role is missing:", { uid, role });
//     throw new Error("UID and Role are required to assign roles.");
//   }

//   try {
//     console.log("Payload sent to setUserRole:", { uid, role }); // Debug log
//     const result = await setUserRole({ uid, role });
//     console.log("Role assigned successfully:", result.data);
//   } catch (error) {
//     console.error("Error assigning role:", error);
//     throw error;
//   }
// };

// // Fetch a user's role

// // Function to fetch the user role from Firebase custom claims
// export const fetchUserRole = async () => {
//   const auth = getAuth(); // Ensure Firebase auth is initialized
//   const user = auth.currentUser; // Get the currently logged-in user

//   if (!user) {
//     throw new Error("User not authenticated");
//   }

//   // Retrieve ID token result with custom claims
//   const idTokenResult = await user.getIdTokenResult();
//   const role = idTokenResult.claims.role;

//   if (!role) {
//     throw new Error("Role not found in user claims");
//   }

//   console.log("Fetched role:", role);
//   return role;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   // Add this for testing purposes (remove in production)
//   useEffect(() => {
//     const testAssignRole = async () => {
//       const uid = "testUID"; // Replace with a valid UID
//       const role = "admin";

//       try {
//         await assignUserRole(uid, role);
//         console.log(`Role '${role}' successfully assigned to user '${uid}'.`);
//       } catch (error) {
//         console.error("Error in testAssignRole:", error);
//       }
//     };

//     // Call the test function (optional, for debugging)
//     testAssignRole();
//   }, []); // No dependencies for test function

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setUser(firebaseUser);
//       setIsLoading(true);
//       if (firebaseUser) {
//         try {
//           const tokenResult = await firebaseUser.getIdTokenResult(true);
//           setToken(tokenResult.token);
//           const role = tokenResult.claims.role || "user";
//           setUserRole(role);

//           console.log("Token claims:", tokenResult.claims);

//           // Remove the code that creates default Firestore document
//           // This prevents overwriting the form data from SignInPage
//         } catch (error) {
//           console.error("Error accessing Firestore or setting roles:", error);
//         }
//       } else {
//         setUserRole(null);
//         setToken(null);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   const checkIfFirstUser = async () => {
//     const querySnapshot = await getDocs(collection(firestore, "locations"));
//     return querySnapshot.empty;
//   };

//   const signIn = async () => {
//     try {
//       setIsLoading(true);
//       await signInWithPopup(auth, googleProvider);
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const tokenResult = await currentUser.getIdTokenResult(true);
//         setToken(tokenResult.token);
//       }
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       setUserRole(null);
//       setToken(null);
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         userRole,
//         token,
//         isLoading,
//         signIn,
//         signOut: signOutUser,
//         assignUserRole,
//         fetchUserRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { auth, googleProvider } from "../services/firebaseConfig";
// import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// import { getFunctions, httpsCallable } from "firebase/functions";

// const AuthContext = createContext();

// // Refresh user's role from token claims
// export const refreshUserRole = async () => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("No user is currently signed in.");

//   const idTokenResult = await user.getIdTokenResult(true); // Force refresh
//   return idTokenResult.claims.role || "user"; // Return the role if it exists
// };

// // Assign a role to a user
// export const assignUserRole = async (uid, role) => {
//   const functions = getFunctions();
//   const setUserRole = httpsCallable(functions, "setUserRole");

//   if (!uid || !role) {
//     throw new Error("UID and Role are required.");
//   }

//   try {
//     const result = await setUserRole({ uid, role });
//     console.log("Role assigned successfully:", result.data);
//     return result.data;
//   } catch (error) {
//     console.error("Error assigning role:", error.message);
//     throw error;
//   }
// };

// // Fetch a user's role
// export const fetchUserRole = async (uid) => {
//   const functions = getFunctions();
//   const getUserRole = httpsCallable(functions, "getUserRole");

//   if (!uid) {
//     throw new Error("UID is required to fetch the role.");
//   }

//   try {
//     const result = await getUserRole({ uid });
//     console.log("Fetched user role:", result.data.role);
//     return result.data.role;
//   } catch (error) {
//     console.error("Error fetching user role:", error.message);
//     throw error;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setIsLoading(true);

//       if (firebaseUser) {
//         try {
//           const tokenResult = await firebaseUser.getIdTokenResult(true);
//           setUser(firebaseUser);
//           setUserRole(tokenResult.claims.role || "user");
//         } catch (error) {
//           console.error("Error fetching token claims:", error.message);
//         }
//       } else {
//         setUser(null);
//         setUserRole(null);
//       }

//       setIsLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const signIn = async () => {
//     try {
//       setIsLoading(true);
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error("Error during sign-in:", error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       setUserRole(null);
//     } catch (error) {
//       console.error("Error during sign-out:", error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         userRole,
//         isLoading,
//         signIn,
//         signOut: signOutUser,
//         assignUserRole,
//         refreshUserRole,
//         fetchUserRole, // Make sure to export fetchUserRole here
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
