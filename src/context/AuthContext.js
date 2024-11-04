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
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, googleProvider } from "../services/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);

      if (firebaseUser) {
        const userDocRef = doc(firestore, "locations", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            locationName: "Default Location",
            contactPerson: firebaseUser.displayName || "Default Contact",
            email: firebaseUser.email,
            address: "Default Address",
            billingAddress: "Default Billing Address",
            billingCycle: "monthly",
            subscriptionPlan: "Standard",
            locationType: "Default Type",
            createdAt: new Date(),
          });
          console.log("New document created for user:", firebaseUser.uid);
        }
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
      setUser(null); // Clear user data on sign out
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
