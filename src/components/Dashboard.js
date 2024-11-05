// // src/pages/Dashboard.js
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/AuthContext";
// import { firestore } from "../services/firebaseConfig";
// import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
// import { useHistory } from "react-router-dom";
// import Toast from "./Toast";

// const OuterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 100vh;
//   padding: 2rem;
//   margin: 20px;
// `;

// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 30px 40px 15px 40px;
//   max-width: 900px;
//   width: 100%;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
//   border-radius: 12px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   transition: background-color 0.3s, color 0.3s;
//   border: 1px solid #2e3136;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: ${({ isDarkMode }) => (isDarkMode ? "#f5f5f5" : "#2E3136")};
//   margin-bottom: 1.5rem;
//   text-align: center;
// `;

// const Section = styled.div`
//   width: 98%;
//   margin-bottom: 20px;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444A" : "#F0F0F0")};
//   padding: 20px;
//   border-radius: 12px;
//   border: 1px solid #2e3136;
//   &:hover {
//     background-color: ${({ isDarkMode }) =>
//       isDarkMode ? "#50555d" : "#f9f9f9"};
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.8rem;
//   color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
//   margin-bottom: 0.8rem;
// `;

// const Input = styled.input`
//   width: 97.5%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   font-size: 1rem;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   font-size: 1rem;
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
//   appearance: none;
//   background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"%3E%3Cpath fill="%23999999" d="M7 10l5 5 5-5z"/%3E%3C/svg%3E');
//   background-repeat: no-repeat;
//   background-position: right 10px center;
//   background-size: 16px 16px;
//   padding-right: 30px;
// `;

// const Button = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   font-size: 1rem;
//   font-weight: bold;
//   width: 100%;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
//   color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#dcdcdc")};
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${({ isDarkMode }) =>
//       isDarkMode ? "#7289da" : "#40444b"};
//   }
// `;

// const Dashboard = ({ isDarkMode }) => {
//   const { user, signOut } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     locationName: "",
//     contactPerson: "",
//     address: "",
//     billingAddress: "",
//     subscriptionPlan: "",
//     billingCycle: "",
//   });
//   const [showToast, setShowToast] = useState(false); // State for showing toast

//   const history = useHistory();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user) {
//         const docRef = doc(firestore, "locations", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserData(data);
//           setFormData(data);
//           setPhoneNumber(data.phoneNumber || ""); // Initialize phone number from Firestore
//         }
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSaveChanges = async () => {
//     if (user) {
//       try {
//         const docRef = doc(firestore, "locations", user.uid);
//         await setDoc(docRef, { ...formData, phoneNumber }, { merge: true });
//         setUserData({ ...formData, phoneNumber });
//         setEditMode(false);
//         setShowToast(true); // Show toast
//         setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
//       } catch (error) {
//         console.error("Error updating user data:", error);
//       }
//     }
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     history.push("/signin");
//   };

//   return (
//     <OuterContainer isDarkMode={isDarkMode}>
//       <DashboardContainer isDarkMode={isDarkMode}>
//         <Title isDarkMode={isDarkMode}>Dashboard</Title>

//         <Section isDarkMode={isDarkMode}>
//           <SectionTitle isDarkMode={isDarkMode}>
//             Account Information
//           </SectionTitle>
//           {editMode ? (
//             <>
//               <Input
//                 type="text"
//                 name="locationName"
//                 value={formData.locationName}
//                 onChange={handleInputChange}
//                 placeholder="Location Name"
//               />
//               <Input
//                 type="text"
//                 name="contactPerson"
//                 value={formData.contactPerson}
//                 onChange={handleInputChange}
//                 placeholder="Contact Person"
//               />
//               <Input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 placeholder="Address"
//               />
//               <Input
//                 type="text"
//                 name="billingAddress"
//                 value={formData.billingAddress}
//                 onChange={handleInputChange}
//                 placeholder="Billing Address"
//               />
//               <Select
//                 name="subscriptionPlan"
//                 value={formData.subscriptionPlan}
//                 onChange={handleInputChange}
//               >
//                 <option value="basic">Free Temporary Access</option>
//                 <option value="premium">Premium Suite</option>
//               </Select>
//               <Select
//                 name="billingCycle"
//                 value={formData.billingCycle}
//                 onChange={handleInputChange}
//               >
//                 <option value="monthly">Monthly</option>
//                 <option value="annual">Annual (Save 10%)</option>
//               </Select>
//               <Input
//                 type="tel"
//                 name="phoneNumber"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Phone Number"
//               />
//               <Button onClick={handleSaveChanges} isDarkMode={isDarkMode}>
//                 Save Changes
//               </Button>
//             </>
//           ) : (
//             <>
//               <p>Location Name: {userData?.locationName}</p>
//               <p>Contact Person: {userData?.contactPerson}</p>
//               <p>Address: {userData?.address}</p>
//               <p>Billing Address: {userData?.billingAddress}</p>
//               <p>Subscription Plan: {userData?.subscriptionPlan}</p>
//               <p>Billing Cycle: {userData?.billingCycle}</p>
//               <p>Phone Number: {phoneNumber || "Not provided"}</p>
//               <Button onClick={() => setEditMode(true)} isDarkMode={isDarkMode}>
//                 Edit Information
//               </Button>
//             </>
//           )}
//         </Section>

//         <Section isDarkMode={isDarkMode}>
//           <SectionTitle isDarkMode={isDarkMode}>Analytics</SectionTitle>
//           <p>View insights and metrics related to your account usage.</p>
//         </Section>

//         <Section isDarkMode={isDarkMode}>
//           <SectionTitle isDarkMode={isDarkMode}>Settings</SectionTitle>
//           <p>Configure your preferences and manage your security settings.</p>
//           <Button isDarkMode={isDarkMode} onClick={handleSignOut}>
//             Sign Out
//           </Button>
//         </Section>
//       </DashboardContainer>
//       {/* Render toast when showToast is true */}
//       {showToast && <Toast message="Information updated successfully" />}
//     </OuterContainer>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.js
// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";
import Toast from "./Toast";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  margin: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px 15px 40px;
  max-width: 900px;
  width: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid #2e3136;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#f5f5f5" : "#2E3136")};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Section = styled.div`
  width: 98%;
  margin-bottom: 20px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444A" : "#F0F0F0")};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #2e3136;
  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#50555d" : "#f9f9f9"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  margin-bottom: 0.8rem;
`;

const Input = styled.input`
  width: 97.5%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #2e3136;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #2e3136;
  font-size: 1rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  appearance: none;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"%3E%3Cpath fill="%23999999" d="M7 10l5 5 5-5z"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  padding-right: 30px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#dcdcdc")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#7289da" : "#40444b"};
  }
`;

const Dashboard = ({ isDarkMode }) => {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email || ""); // Initialize email field
  const [formData, setFormData] = useState({
    locationName: "",
    contactPerson: "",
    address: "",
    billingAddress: "",
    subscriptionPlan: "",
    billingCycle: "",
  });
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(firestore, "locations", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFormData(data);
          setPhoneNumber(data.phoneNumber || "");
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (user) {
      try {
        // Update Firestore data
        const docRef = doc(firestore, "locations", user.uid);
        await setDoc(docRef, { ...formData, phoneNumber }, { merge: true });

        // Update email in Firebase Authentication if it has changed
        if (email !== user.email) {
          const credential = EmailAuthProvider.credential(
            user.email,
            prompt("Please enter your password for re-authentication:")
          );
          await reauthenticateWithCredential(user, credential);
          await updateEmail(user, email);
          alert("Email updated successfully!");
        }

        setUserData({ ...formData, phoneNumber });
        setEditMode(false);
        setShowToast(true); // Show toast
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      } catch (error) {
        console.error("Error updating user data or email:", error);
        alert("Failed to update information. Please try again.");
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    history.push("/signin");
  };

  return (
    <OuterContainer isDarkMode={isDarkMode}>
      <DashboardContainer isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>Dashboard</Title>

        <Section isDarkMode={isDarkMode}>
          <SectionTitle isDarkMode={isDarkMode}>
            Account Information
          </SectionTitle>
          {editMode ? (
            <>
              <Input
                type="text"
                name="locationName"
                value={formData.locationName}
                onChange={handleInputChange}
                placeholder="Location Name"
              />
              <Input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Contact Person"
              />
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <Input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                placeholder="Billing Address"
              />
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <Select
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleInputChange}
              >
                <option value="basic">Free Temporary Access</option>
                <option value="premium">Premium Suite</option>
              </Select>
              <Select
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleInputChange}
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annual (Save 10%)</option>
              </Select>
              <Input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
              <Button onClick={handleSaveChanges} isDarkMode={isDarkMode}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <p>Location Name: {userData?.locationName}</p>
              <p>Contact Person: {userData?.contactPerson}</p>
              <p>Address: {userData?.address}</p>
              <p>Billing Address: {userData?.billingAddress}</p>
              <p>Email: {user?.email}</p>
              <p>Subscription Plan: {userData?.subscriptionPlan}</p>
              <p>Billing Cycle: {userData?.billingCycle}</p>
              <p>Phone Number: {phoneNumber || "Not provided"}</p>
              <Button onClick={() => setEditMode(true)} isDarkMode={isDarkMode}>
                Edit Information
              </Button>
            </>
          )}
        </Section>

        <Section isDarkMode={isDarkMode}>
          <SectionTitle isDarkMode={isDarkMode}>Analytics</SectionTitle>
          <p>View insights and metrics related to your account usage.</p>
        </Section>

        <Section isDarkMode={isDarkMode}>
          <SectionTitle isDarkMode={isDarkMode}>Settings</SectionTitle>
          <p>Configure your preferences and manage your security settings.</p>
          <Button isDarkMode={isDarkMode} onClick={handleSignOut}>
            Sign Out
          </Button>
        </Section>
      </DashboardContainer>
      {showToast && <Toast message="Information updated successfully" />}
    </OuterContainer>
  );
};

export default Dashboard;
