// // src/pages/Dashboard.js
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/AuthContext";
// import { firestore } from "../services/firebaseConfig";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useHistory } from "react-router-dom";
// import {
//   reauthenticateWithCredential,
//   EmailAuthProvider,
//   updateEmail,
// } from "firebase/auth";
// import Toast from "./Toast";
// import PasswordSetupModal from "./PasswordSetupModal";

// // Styled components
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
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#ffffff")};
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

// // New styled components for labels and values
// const InfoLabel = styled.span`
//   font-weight: bold;
//   font-size: 1.1rem;
//   padding: 2px 0px;
//   /* background-color: ${({ isDarkMode }) =>
//     isDarkMode ? "#ffffff" : "#2E3136"}; */
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#333333")};
//   /* margin-right: 5px; */
//   border-radius: 4px;
// `;

// const InfoValue = styled.span`
//   font-size: 1rem;
//   /* background-color: ${({ isDarkMode }) =>
//     isDarkMode ? "#44FD47" : "#2E3136"}; */
//   color: ${({ isDarkMode }) => (isDarkMode ? "#44FD47" : "#333333")};
//   padding: 4px 0px 4px 0px;
//   border-radius: 4px;
//   line-height: 1.5;
//   @media screen and (max-width: 500px) {
//     font-size: 0.9rem;
//   }
// `;

// const InfoRow = styled.div`
//   margin-bottom: 10px;
// `;

// const Input = styled.input`
//   width: 100%; // Set to 100% for consistency
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
//   border: 1px solid #2e3136;
//   font-size: 1rem;
//   box-sizing: border-box; // Ensures consistent sizing with Select
// `;

// const Select = styled.select`
//   width: 100%; // Ensure Select has the same width
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
//   box-sizing: border-box; // Ensures consistent sizing with Input
// `;

// const Button = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   font-size: 1rem;
//   font-weight: bold;
//   width: 100%;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
//   color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#ffffff")};
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${({ isDarkMode }) =>
//       isDarkMode ? "#7289da" : "#40444b"};
//   }
// `;

// const UserAdminDashboard = ({ isDarkMode }) => {
//   const { user, signOut } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [email, setEmail] = useState(user?.email || "");
//   const [formData, setFormData] = useState({
//     locationName: "",
//     contactPerson: "",
//     address: "",
//     billingAddress: "",
//     subscriptionPlan: "",
//     billingCycle: "",
//   });
//   const [showToast, setShowToast] = useState(false);
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
//           setPhoneNumber(data.phoneNumber || "");
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

//         if (email !== user.email) {
//           const credential = EmailAuthProvider.credential(
//             user.email,
//             prompt("Please enter your password for re-authentication:")
//           );
//           await reauthenticateWithCredential(user, credential);
//           await updateEmail(user, email);
//           alert("Email updated successfully!");
//         }

//         setUserData({ ...formData, phoneNumber });
//         setEditMode(false);
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//       } catch (error) {
//         console.error("Error updating user data or email:", error);
//         alert("Failed to update information. Please try again.");
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
//               {/* Editable fields */}
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
//               <Input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email Address"
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
//               {/* Display fields */}
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Location Name:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {userData?.locationName}
//                 </InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Contact Person:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {userData?.contactPerson}
//                 </InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Address:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {userData?.address}
//                 </InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Billing Address:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {userData?.billingAddress}
//                 </InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Email:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>{user?.email}</InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>
//                   Subscription Plan:
//                 </InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {userData?.subscriptionPlan}
//                 </InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Billing Cycle:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {userData?.billingCycle}
//                 </InfoValue>
//               </InfoRow>
//               <InfoRow>
//                 <InfoLabel isDarkMode={isDarkMode}>Phone Number:</InfoLabel>{" "}
//                 <InfoValue isDarkMode={isDarkMode}>
//                   {phoneNumber || "Not provided"}
//                 </InfoValue>
//               </InfoRow>
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
//       {showToast && <Toast message="Information updated successfully" />}
//     </OuterContainer>
//   );
// };

// export default UserAdminDashboard;

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
import PasswordSetupModal from "./PasswordSetupModal";

// Styled components
const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const TopPartDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px 15px 40px;
  max-width: 900px;
  margin-bottom: 20px;
  width: 90%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#ffffff")};
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid #2e3136;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px 15px 40px;
  max-width: 900px;
  width: 90%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#ffffff")};
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid #2e3136;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#f5f5f5" : "#2E3136")};
  /* margin-bottom: 1.5rem; */
  text-align: center;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98%;
  margin-bottom: 10px;
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

const Section = styled.div`
  width: 100%; /* Ensure full width consistency */
  margin-bottom: 20px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444A" : "#F0F0F0")};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #2e3136;
  box-sizing: border-box; /* Consistent padding/border handling */
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#f9f9f9")};
  padding: 10px; /* Match padding with Input */
  border-radius: 8px;
  border: 1px solid #404449;
  width: 100%; /* Ensures it matches the width of Input/Select */
  box-sizing: border-box; /* Consistent padding and border handling */

  @media (max-width: 480px) {
    flex-direction: column; /* Stack elements on smaller screens */
    align-items: flex-start;
  }
`;

const InfoLabel = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#333333")};
  margin-right: 10px; /* Add space when displayed in a row */

  @media (max-width: 480px) {
    margin-right: 0; /* Remove margin in column layout */
    margin-bottom: 5px; /* Add space below label */
  }
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#44FD47" : "#333333")};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  margin-bottom: 0.8rem;
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const AdminText = styled.p`
  display: flex;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 20px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#f9f9f9" : "#2E3136")};
`;

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #2e3136;
  font-size: 1rem;
  box-sizing: border-box; /* Ensures consistent width with padding */
`;

const Select = styled.select`
  width: 100%; /* Match width to ensure alignment */
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #2e3136;
  font-size: 1rem;
  box-sizing: border-box; /* Ensures consistent width with padding */
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  appearance: none;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#ffffff")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#7289da" : "#40444b"};
  }
`;

export const ButtonSignOut = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#ffffff")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#7289da" : "#40444b"};
  }
`;

const ProfileHeader = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  margin-bottom: 10px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};

  @media (max-width: 480px) {
    flex-direction: column; /* Stack the content in a column */
    text-align: center; /* Center-align text for better readability */
    font-size: 24px; /* Adjust font size for smaller screens */
  }
`;

const ProfileHeaderInfoValue = styled.span`
  font-size: 2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#44FD47" : "#333333")};
  margin-left: 5px; /* Add spacing when displayed in a row */

  @media (max-width: 480px) {
    margin-left: 0; /* Remove margin in column layout */
    margin-top: 5px; /* Add spacing above the value */
    font-size: 1.8rem; /* Adjust font size for smaller screens */
  }
`;

const UserAdminDashboard = ({ isDarkMode }) => {
  const { user, signOut } = useAuth();
  const [role, setRole] = useState("Loading role...");
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [formData, setFormData] = useState({
    locationName: "",
    contactPerson: "",
    address: "",
    billingAddress: "",
    subscriptionPlan: "",
    billingCycle: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
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
          setRole(data.role || "user");
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
        const docRef = doc(firestore, "locations", user.uid);
        await setDoc(docRef, { ...formData, phoneNumber }, { merge: true });

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
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
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
      <TopPartDashboardContainer isDarkMode={isDarkMode}>
        <TopSection isDarkMode={isDarkMode}>
          <ProfileHeader isDarkMode={isDarkMode}>
            Welcome,{" "}
            <ProfileHeaderInfoValue isDarkMode={isDarkMode}>
              {user.displayName || user.email}
            </ProfileHeaderInfoValue>
          </ProfileHeader>
          <Text>
            Your Role: <InfoValue isDarkMode={isDarkMode}>{role}</InfoValue>{" "}
          </Text>
        </TopSection>
      </TopPartDashboardContainer>

      <DashboardContainer isDarkMode={isDarkMode}>
        {/* Keep the existing content */}

        <Title isDarkMode={isDarkMode}>Admin Panel</Title>
        <AdminText isDarkMode={isDarkMode}>
          Manage roles and permissions for users directly from this panel.
        </AdminText>
        <Section isDarkMode={isDarkMode}>
          <SectionTitle isDarkMode={isDarkMode}>
            Account Information
          </SectionTitle>
          {editMode ? (
            <>
              {/* Editable fields */}
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
              {/* Display fields */}
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Location Name:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {userData?.locationName}
                </InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Contact Person:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {userData?.contactPerson}
                </InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Address:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {userData?.address}
                </InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Billing Address:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {userData?.billingAddress}
                </InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Email:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>{user?.email}</InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>
                  Subscription Plan:
                </InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {userData?.subscriptionPlan}
                </InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Billing Cycle:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {userData?.billingCycle}
                </InfoValue>
              </InfoRow>
              <InfoRow isDarkMode={isDarkMode}>
                <InfoLabel isDarkMode={isDarkMode}>Phone Number:</InfoLabel>{" "}
                <InfoValue isDarkMode={isDarkMode}>
                  {phoneNumber || "Not provided"}
                </InfoValue>
              </InfoRow>
              <Button onClick={() => setEditMode(true)} isDarkMode={isDarkMode}>
                Edit Information
              </Button>
            </>
          )}
        </Section>
        <Section isDarkMode={isDarkMode}>
          <ButtonSignOut isDarkMode={isDarkMode} onClick={handleSignOut}>
            Sign Out
          </ButtonSignOut>
        </Section>
      </DashboardContainer>
      {showToast && <Toast message="Information updated successfully" />}
    </OuterContainer>
  );
};

export default UserAdminDashboard;
