// import React, { useState } from "react";
// import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { firestore, auth } from "../services/firebaseConfig";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // Styled Components
// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   overflow: hidden;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 4%;
//   background-color: rgba(255, 255, 255, 0.1);
//   backdrop-filter: blur(50px);
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   font-family: Arial, sans-serif;
//   width: 100%;
//   max-width: 800px;
//   box-sizing: border-box;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
//   margin: 0px 20px;
// `;

// const Title = styled.h1`
//   font-size: clamp(1.5rem, 2.5vw, 2rem);
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2E3136")};
//   text-align: center;
//   margin: 10px 0px 30px 0px;
// `;

// const Form = styled.form`
//   width: 100%;
//   display: grid;
//   grid-template-columns: 1fr 1fr; /* Default two-column layout */
//   gap: 20px 12px;

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr; /* Stack items in a single column */
//     gap: 16px; /* Adjust spacing for better readability */
//   }
// `;
// const AddressGroup = styled.div`
//   display: grid;
//   grid-template-columns: 1fr; /* Default: stack fields in a column */
//   gap: 12px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (min-width: 480px) {
//     grid-template-columns: 1fr; /* Address spans full width on small screens */
//   }
// `;

// const ZipStateGroup = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr; /* Two fields side by side */
//   gap: 12px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Label = styled.p`
//   font-size: clamp(0.9rem, 1.2vw, 1rem);
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const Input = styled.input`
//   padding: 8px;
//   font-size: clamp(0.9rem, 1.2vw, 1rem);
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   width: 100%;
//   box-sizing: border-box;

//   &::placeholder {
//     color: #a1a1a1;
//   }
// `;

// const Select = styled.select`
//   padding: 8px;
//   font-size: clamp(0.9rem, 1.2vw, 1rem);
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Button = styled.button`
//   grid-column: span 2; /* Default: Span both columns */
//   padding: 10px;
//   font-size: clamp(1rem, 1.8vw, 1.2rem);
//   font-weight: bold;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#5a6eaf" : "#2E3136")};
//   color: #ffffff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   width: 100%;
//   margin-top: 10px;

//   &:hover {
//     background-color: ${({ isDarkMode }) =>
//       isDarkMode ? "#7289da" : "#40444b"};
//   }

//   @media (max-width: 480px) {
//     grid-column: span 1; /* Ensure it takes full width in a single-column layout */
//   }
// `;

// const SignInPage = ({ isDarkMode }) => {
//   const { signIn } = useAuth();
//   const [formData, setFormData] = useState({
//     locationName: "",
//     contactPerson: "",
//     address: "",
//     zipCode: "",
//     state: "",
//     locationType: "",
//     subscriptionPlan: "",
//     billingCycle: "",
//     billingAddress: "",
//   });
//   const history = useHistory();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const functions = getFunctions(); // Initialize Firebase Functions
//   const setUserRole = httpsCallable(functions, "setUserRole");

//   const auth = getAuth(); // Initialize Firebase Auth

//   // This ensures that the functions requests use the current user's token
//   functions.emulatorOrigin = "http://localhost:5001"; // Only needed if using emulator

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     console.log("Updated formData:", { ...formData, [name]: value }); // Log updates
//   };

//   const handleZipCodeChange = (e) => {
//     const zipCode = e.target.value;

//     // Allow only numbers with a maximum length of 5
//     if (/^\d{0,5}$/.test(zipCode)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         zipCode,
//       }));
//     }
//   };

//   // Define `initialFormData` at the top of your component
//   const initialFormData = {
//     locationName: "",
//     contactPerson: "",
//     address: "",
//     zipCode: "",
//     state: "",
//     locationType: "",
//     subscriptionPlan: "",
//     billingCycle: "",
//     billingAddress: "",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await signIn(); // Authenticate user
//       const currentUser = auth.currentUser;

//       if (!currentUser) {
//         throw new Error("User not authenticated.");
//       }

//       // Refresh the user's ID token
//       const idTokenResult = await currentUser.getIdTokenResult(true);

//       // Save user data to Firestore
//       const userDocRef = doc(firestore, "locations", currentUser.uid);
//       const userData = {
//         ...formData,
//         email: currentUser.email || "",
//         role: "admin",
//         createdAt: new Date(),
//       };
//       await setDoc(userDocRef, userData);

//       // Call the backend function to assign the role
//       const setUserRole = httpsCallable(functions, "setUserRole");
//       const result = await setUserRole({ uid: currentUser.uid, role: "admin" });

//       console.log("Role assigned successfully:", result.data.message);
//       alert(result.data.message);

//       // Redirect to admin panel
//       history.push("/admin-panel");
//     } catch (error) {
//       console.error("Error during form submission:", error.message);
//       alert(`Error: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);

//   //   try {
//   //     // Authenticate user
//   //     await signIn();
//   //     const currentUser = auth.currentUser;

//   //     if (!currentUser) {
//   //       throw new Error("User not authenticated.");
//   //     }

//   //     // Refresh ID token
//   //     // Refresh token
//   //     await currentUser.getIdToken(true);

//   //     const idTokenResult = await currentUser.getIdTokenResult(true);
//   //     if (!idTokenResult.claims.role) {
//   //       console.warn("Role not set in token claims.");
//   //     }
//   //     console.log("FormData before saving to Firestore:", formData);

//   //     // Firestore document reference
//   //     const userDocRef = doc(firestore, "locations", currentUser.uid);
//   //     const docSnapshot = await getDoc(userDocRef);

//   //     if (docSnapshot.exists()) {
//   //       console.warn("Document already exists for user:", currentUser.uid);
//   //       alert("An account already exists for this user.");
//   //       history.push("/admin-panel"); // Redirect if document exists
//   //       return;
//   //     }

//   //     // Save user data to Firestore
//   //     const userData = {
//   //       ...formData,
//   //       email: currentUser.email || "",
//   //       role: "admin",
//   //       createdAt: new Date(),
//   //     };

//   //     await setDoc(userDocRef, userData);
//   //     console.log("Document successfully saved:", userData);

//   //     // Assign role using Cloud Function
//   //     const functions = getFunctions();
//   //     const setUserRole = httpsCallable(functions, "setUserRole");
//   //     const result = await setUserRole({ uid: currentUser.uid, role: "admin" });

//   //     console.log("Role assigned successfully:", result.data.message);
//   //     alert(result.data.message);

//   //     // Redirect to the admin panel
//   //     history.push("/admin-panel");
//   //   } catch (error) {
//   //     console.error("Error during form submission:", error.message);
//   //     alert(`Error: ${error.message}`);
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   return (
//     <Wrapper isDarkMode={isDarkMode}>
//       <Container isDarkMode={isDarkMode}>
//         <Title isDarkMode={isDarkMode}>Experience Setup</Title>
//         <Form onSubmit={handleSubmit}>
//           <div>
//             <Label htmlFor="locationName">Location Name</Label>
//             <Input
//               type="text"
//               id="locationName"
//               name="locationName"
//               value={formData.locationName}
//               onChange={handleChange}
//               placeholder="e.g., Downtown Museum"
//             />
//           </div>
//           <div>
//             <Label htmlFor="locationType">Location Type</Label>
//             <Select
//               id="locationType"
//               name="locationType"
//               value={formData.locationType}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select Type
//               </option>
//               <option value="museum">Museum</option>
//               <option value="exhibit">Exhibit</option>
//               <option value="gallery">Gallery</option>
//               <option value="historical_site">Historical Site</option>
//               <option value="other">Other</option>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="contactPerson">Primary Contact Person</Label>
//             <Input
//               type="text"
//               id="contactPerson"
//               name="contactPerson"
//               value={formData.contactPerson}
//               onChange={handleChange}
//               placeholder="e.g., John Doe"
//             />
//           </div>

//           <div>
//             <Label htmlFor="address">Street Address</Label>
//             <Input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="e.g., 1234 Museum Lane"
//             />
//           </div>

//           {/* Zip and State Group */}
//           <ZipStateGroup>
//             <div>
//               <Label htmlFor="zipCode">Zip</Label>
//               <Input
//                 type="text"
//                 id="zipCode"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleZipCodeChange}
//                 placeholder="e.g., 12345"
//               />
//             </div>
//             <div>
//               <Label htmlFor="state">State</Label>
//               <Select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled>
//                   Select State
//                 </option>
//                 <option value="AL">AL</option>
//                 <option value="AK">AK</option>
//                 <option value="AZ">AZ</option>
//                 <option value="AR">AR</option>
//                 <option value="CA">CA</option>
//                 <option value="CO">CO</option>
//                 <option value="CT">CT</option>
//                 <option value="DE">DE</option>
//                 <option value="FL">FL</option>
//                 <option value="GA">GA</option>
//                 <option value="HI">HI</option>
//                 <option value="ID">ID</option>
//                 <option value="IL">IL</option>
//                 <option value="IN">IN</option>
//                 <option value="IA">IA</option>
//                 <option value="KS">KS</option>
//                 <option value="KY">KY</option>
//                 <option value="LA">LA</option>
//                 <option value="ME">ME</option>
//                 <option value="MD">MD</option>
//                 <option value="MA">MA</option>
//                 <option value="MI">MI</option>
//                 <option value="MN">MN</option>
//                 <option value="MS">MS</option>
//                 <option value="MO">MO</option>
//                 <option value="MT">MT</option>
//                 <option value="NE">NE</option>
//                 <option value="NV">NV</option>
//                 <option value="NH">NH</option>
//                 <option value="NJ">NJ</option>
//                 <option value="NM">NM</option>
//                 <option value="NY">NY</option>
//                 <option value="NC">NC</option>
//                 <option value="ND">ND</option>
//                 <option value="OH">OH</option>
//                 <option value="OK">OK</option>
//                 <option value="OR">OR</option>
//                 <option value="PA">PA</option>
//                 <option value="RI">RI</option>
//                 <option value="SC">SC</option>
//                 <option value="SD">SD</option>
//                 <option value="TN">TN</option>
//                 <option value="TX">TX</option>
//                 <option value="UT">UT</option>
//                 <option value="VT">VT</option>
//                 <option value="VA">VA</option>
//                 <option value="WA">WA</option>
//                 <option value="WV">WV</option>
//                 <option value="WI">WI</option>
//                 <option value="WY">WY</option>
//               </Select>
//             </div>
//           </ZipStateGroup>

//           <div>
//             <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
//             <Select
//               id="subscriptionPlan"
//               name="subscriptionPlan"
//               value={formData.subscriptionPlan}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select Plan
//               </option>
//               <option value="basic">Free Temporary Access</option>
//               <option value="premium">Premium Suite</option>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="billingCycle">Billing Cycle</Label>
//             <Select
//               id="billingCycle"
//               name="billingCycle"
//               value={formData.billingCycle}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select Cycle
//               </option>
//               <option value="monthly">Monthly</option>
//               <option value="annual">Annual</option>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="billingAddress">Billing Address</Label>
//             <Input
//               type="text"
//               id="billingAddress"
//               name="billingAddress"
//               value={formData.billingAddress}
//               onChange={handleChange}
//               placeholder="e.g., Billing Dept"
//             />
//           </div>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Create Account"}
//           </Button>
//         </Form>
//       </Container>
//     </Wrapper>
//   );
// };

// export default SignInPage;

// import React, { useState } from "react";
// import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { firestore } from "../services/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // Styled Components
// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   overflow: hidden;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 4%;
//   background-color: rgba(255, 255, 255, 0.1);
//   backdrop-filter: blur(50px);
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   font-family: Arial, sans-serif;
//   width: 100%;
//   max-width: 800px;
//   box-sizing: border-box;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
// `;

// const Title = styled.h1`
//   font-size: clamp(1.5rem, 2.5vw, 2rem);
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2E3136")};
//   text-align: center;
//   margin: 10px 0px 30px 0px;
// `;

// const Form = styled.form`
//   width: 100%;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px 12px;

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//     gap: 16px;
//   }
// `;

// const Label = styled.label`
//   font-size: clamp(0.9rem, 1.2vw, 1rem);
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const Input = styled.input`
//   padding: 8px;
//   font-size: clamp(0.9rem, 1.2vw, 1rem);
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   width: 100%;
//   box-sizing: border-box;

//   &::placeholder {
//     color: #a1a1a1;
//   }
// `;

// const Select = styled.select`
//   padding: 8px;
//   font-size: clamp(0.9rem, 1.2vw, 1rem);
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Button = styled.button`
//   grid-column: span 2;
//   padding: 10px;
//   font-size: clamp(1rem, 1.8vw, 1.2rem);
//   font-weight: bold;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#5a6eaf" : "#2E3136")};
//   color: #ffffff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;
//   margin-top: 10px;

//   &:hover {
//     background-color: ${({ isDarkMode }) =>
//       isDarkMode ? "#7289da" : "#40444b"};
//   }

//   @media (max-width: 480px) {
//     grid-column: span 1;
//   }
// `;

// const ZipStateGroup = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr; /* Two fields side by side */
//   gap: 12px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const SignInPage = ({ isDarkMode }) => {
//   const { signIn } = useAuth();
//   const [formData, setFormData] = useState({
//     locationName: "",
//     contactPerson: "",
//     address: "",
//     zipCode: "",
//     state: "",
//     locationType: "",
//     subscriptionPlan: "",
//     billingCycle: "",
//     billingAddress: "",
//   });
//   const history = useHistory();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const functions = getFunctions();
//   const setUserRole = httpsCallable(functions, "setUserRole");
//   const auth = getAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleZipCodeChange = (e) => {
//     const zipCode = e.target.value;
//     if (/^\d{0,5}$/.test(zipCode)) {
//       setFormData((prev) => ({
//         ...prev,
//         zipCode,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await signIn();
//       const currentUser = auth.currentUser;
//       if (!currentUser) throw new Error("User not authenticated.");

//       const userDocRef = doc(firestore, "locations", currentUser.uid);
//       const userData = {
//         ...formData,
//         email: currentUser.email || "",
//         role: "admin",
//         createdAt: new Date(),
//       };
//       await setDoc(userDocRef, userData);
//       await setUserRole({ uid: currentUser.uid, role: "admin" });

//       history.push("/admin-panel");
//     } catch (error) {
//       console.error("Error during form submission:", error.message);
//       alert(`Error: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Wrapper isDarkMode={isDarkMode}>
//       <Container isDarkMode={isDarkMode}>
//         <Title isDarkMode={isDarkMode}>Experience Setup</Title>
//         <Form onSubmit={handleSubmit}>
//           <div>
//             <Label htmlFor="locationName">Location Name</Label>
//             <Input
//               type="text"
//               id="locationName"
//               name="locationName"
//               value={formData.locationName}
//               onChange={handleChange}
//               placeholder="e.g., Downtown Museum"
//             />
//           </div>
//           <div>
//             <Label htmlFor="locationType">Location Type</Label>
//             <Select
//               id="locationType"
//               name="locationType"
//               value={formData.locationType}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select Type
//               </option>
//               <option value="museum">Museum</option>
//               <option value="exhibit">Exhibit</option>
//               <option value="gallery">Gallery</option>
//               <option value="historical_site">Historical Site</option>
//               <option value="other">Other</option>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="contactPerson">Primary Contact Person</Label>
//             <Input
//               type="text"
//               id="contactPerson"
//               name="contactPerson"
//               value={formData.contactPerson}
//               onChange={handleChange}
//               placeholder="e.g., John Doe"
//             />
//           </div>
//           <div>
//             <Label htmlFor="address">Street Address</Label>
//             <Input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="e.g., 1234 Museum Lane"
//             />
//           </div>
//           <ZipStateGroup>
//             <div>
//               <Label htmlFor="zipCode">Zip</Label>
//               <Input
//                 type="text"
//                 id="zipCode"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleZipCodeChange}
//                 placeholder="e.g., 12345"
//               />
//             </div>
//             <div>
//               <Label htmlFor="state">State</Label>
//               <Select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled>
//                   Select State
//                 </option>
//                 {[
//                   "AL",
//                   "AK",
//                   "AZ",
//                   "AR",
//                   "CA",
//                   "CO",
//                   "CT",
//                   "DE",
//                   "FL",
//                   "GA",
//                   "HI",
//                   "ID",
//                   "IL",
//                   "IN",
//                   "IA",
//                   "KS",
//                   "KY",
//                   "LA",
//                   "ME",
//                   "MD",
//                   "MA",
//                   "MI",
//                   "MN",
//                   "MS",
//                   "MO",
//                   "MT",
//                   "NE",
//                   "NV",
//                   "NH",
//                   "NJ",
//                   "NM",
//                   "NY",
//                   "NC",
//                   "ND",
//                   "OH",
//                   "OK",
//                   "OR",
//                   "PA",
//                   "RI",
//                   "SC",
//                   "SD",
//                   "TN",
//                   "TX",
//                   "UT",
//                   "VT",
//                   "VA",
//                   "WA",
//                   "WV",
//                   "WI",
//                   "WY",
//                 ].map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </Select>
//             </div>
//           </ZipStateGroup>

//           <div>
//             <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
//             <Select
//               id="subscriptionPlan"
//               name="subscriptionPlan"
//               value={formData.subscriptionPlan}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select Plan
//               </option>
//               <option value="basic">Free Temporary Access</option>
//               <option value="premium">Premium Suite</option>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="billingCycle">Billing Cycle</Label>
//             <Select
//               id="billingCycle"
//               name="billingCycle"
//               value={formData.billingCycle}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select Cycle
//               </option>
//               <option value="monthly">Monthly</option>
//               <option value="annual">Annual</option>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="billingAddress">Billing Address</Label>
//             <Input
//               type="text"
//               id="billingAddress"
//               name="billingAddress"
//               value={formData.billingAddress}
//               onChange={handleChange}
//               placeholder="e.g., Billing Dept"
//             />
//           </div>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Create Account"}
//           </Button>
//         </Form>
//       </Container>
//     </Wrapper>
//   );
// };

// export default SignInPage;

import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firestore } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Styled Components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(50px);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2E3136")};
  text-align: center;
  margin: 10px 0px 30px 0px;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Label = styled.label`
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  border-radius: 5px;
  border: 1px solid #2e3136;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #a1a1a1;
  }
`;

const Select = styled.select`
  padding: 8px;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  border-radius: 5px;
  border: 1px solid #2e3136;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  grid-column: span 2;
  padding: 10px;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: bold;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#5a6eaf" : "#2E3136")};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#7289da" : "#40444b"};
  }

  @media (max-width: 480px) {
    grid-column: span 1;
  }
`;

const ZipStateGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const SignInPage = ({ isDarkMode }) => {
  const [error, setError] = useState(""); // New state for error message
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    locationName: "",
    contactPerson: "",
    address: "",
    zipCode: "",
    state: "",
    locationType: "",
    subscriptionPlan: "",
    billingCycle: "",
    billingAddress: "",
  });
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const functions = getFunctions();
  const setUserRole = httpsCallable(functions, "setUserRole");
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleZipCodeChange = (e) => {
    const zipCode = e.target.value;
    if (/^\d{0,5}$/.test(zipCode)) {
      setFormData((prev) => ({
        ...prev,
        zipCode,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signIn();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("User not authenticated.");

      const userDocRef = doc(firestore, "locations", currentUser.uid);
      const userData = {
        ...formData,
        email: currentUser.email || "",
        role: "admin",
        createdAt: new Date(),
      };
      await setDoc(userDocRef, userData);
      await setUserRole({ uid: currentUser.uid, role: "admin" });

      history.push("/admin-panel");
    } catch (error) {
      setError(error.message);
      console.error("Error during form submission:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <Container isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>Experience Setup</Title>
        {error && (
          <div role="alert" style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Location Name */}
          <div>
            <Label htmlFor="locationName">Location Name</Label>
            <Input
              type="text"
              id="locationName"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              placeholder="e.g., Downtown Museum"
            />
          </div>

          {/* Location Type */}
          <div>
            <Label htmlFor="locationType">Location Type</Label>
            <Select
              id="locationType"
              name="locationType"
              value={formData.locationType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="museum">Museum</option>
              <option value="exhibit">Exhibit</option>
              <option value="gallery">Gallery</option>
              <option value="historical_site">Historical Site</option>
              <option value="other">Other</option>
            </Select>
          </div>

          {/* Contact Person */}
          <div>
            <Label htmlFor="contactPerson">Primary Contact Person</Label>
            <Input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="e.g., John Doe"
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 1234 Museum Lane"
            />
          </div>

          {/* Zip Code and State */}
          <ZipStateGroup>
            <div>
              <Label htmlFor="zipCode">Zip</Label>
              <Input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleZipCodeChange}
                placeholder="e.g., 12345"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select State
                </option>
                {[
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "CA",
                  "CO",
                  "CT",
                  "DE",
                  "FL",
                  "GA",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "ME",
                  "MD",
                  "MA",
                  "MI",
                  "MN",
                  "MS",
                  "MO",
                  "MT",
                  "NE",
                  "NV",
                  "NH",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "UT",
                  "VT",
                  "VA",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>
          </ZipStateGroup>

          {/* Subscription Plan */}
          <div>
            <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
            <Select
              id="subscriptionPlan"
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Plan
              </option>
              <option value="basic">Free Temporary Access</option>
              <option value="premium">Premium Suite</option>
            </Select>
          </div>

          {/* Billing Cycle */}
          <div>
            <Label htmlFor="billingCycle">Billing Cycle</Label>
            <Select
              id="billingCycle"
              name="billingCycle"
              value={formData.billingCycle}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Cycle
              </option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </Select>
          </div>

          {/* Billing Address */}
          <div>
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              placeholder="e.g., Billing Dept"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Account"}
          </Button>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default SignInPage;
