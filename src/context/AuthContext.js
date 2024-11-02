import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, googleProvider } from "../services/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);

      if (firebaseUser) {
        console.log("User data on sign-in:", firebaseUser); // Logs user data
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during sign-in:", error);
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signOut: signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
// src/context/AuthContext.js

// src/context/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { auth, googleProvider, firestore } from "../services/firebaseConfig";
// import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Sign-in function that handles additional data
//   const signIn = async (additionalData = {}) => {
//     try {
//       setIsLoading(true);
//       const result = await signInWithPopup(auth, googleProvider);
//       const userId = result.user.uid;

//       // Save additional data to Firestore
//       if (Object.keys(additionalData).length > 0) {
//         const userDocRef = doc(firestore, "users", userId);
//         await setDoc(userDocRef, additionalData, { merge: true });
//         setUserData(additionalData);
//       }
//     } catch (err) {
//       console.error("Error during sign-in:", err);
//       setError("Failed to sign in. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Sign-out function
//   const signOutUser = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       setUserData(null);
//     } catch (err) {
//       console.error("Error during sign-out:", err);
//       setError("Failed to sign out. Please try again.");
//     }
//   };

//   // OnAuthStateChanged to manage auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setIsLoading(true);
//       setUser(firebaseUser);
//       setError(null);

//       if (firebaseUser) {
//         try {
//           const userDocRef = doc(firestore, "users", firebaseUser.uid);
//           const userDoc = await getDoc(userDocRef);

//           if (userDoc.exists()) {
//             console.log("User additional data retrieved:", userDoc.data());
//             setUserData(userDoc.data());
//           } else {
//             console.log("No additional data found for user.");
//             setUserData(null);
//           }
//         } catch (err) {
//           console.error("Error fetching user data:", err);
//           setError(
//             navigator.onLine
//               ? "Failed to retrieve user data."
//               : "Offline mode: Unable to retrieve data."
//           );
//         }
//       } else {
//         setUserData(null);
//       }

//       setIsLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ user, userData, isLoading, error, signIn, signOut: signOutUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
