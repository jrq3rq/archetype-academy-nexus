// import React from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/AuthContext"; // Assuming you have a custom hook for authentication
// import UserProfile from "../pages/UserProfile";
// import CheckRole from "./CheckRole";
// import RoleManager from "./RoleManager";
// import UserAdminProfile from "./UserAdminProfile";
// import UserAdminDashboard from "./UserAdminDashboard";
// // import RoleManager from "./RoleManager";
// // import CheckRole from "./CheckRole";

// const ParentContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   min-height: 100vh;
//   padding: 1rem;
// `;

// const AdminPanelContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 30px 40px 15px 40px;
//   max-width: 100%;
//   width: 400px;
//   background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#ffffff")};
//   border-radius: 12px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
//   border: 1px solid #2e3136;
//   margin-top: 20px;
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   color: ${({ isDarkMode }) => (isDarkMode ? "#f5f5f5" : "#2E3136")};
//   margin-bottom: 1.5rem;
//   text-align: center;
// `;

// const Message = styled.p`
//   align-items: center;
//   text-align: center;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   color: ${({ isError }) => (isError ? "red" : "green")};
// `;

// const PermissionDeniedMessage = styled.p`
//   font-size: 1.2rem;
//   color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#33363c")};
//   text-align: center;
//   font-weight: bold;
//   padding: 10px;
// `;

// const CenteredContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const AdminPanel = ({ isDarkMode }) => {
//   const { userRole, isLoading } = useAuth(); // Use role and loading state from AuthContext

//   if (isLoading) {
//     return (
//       <CenteredContainer>
//         <p>Loading...</p>
//       </CenteredContainer>
//     );
//   }

//   if (userRole !== "admin") {
//     return (
//       <CenteredContainer>
//         <PermissionDeniedMessage isDarkMode={isDarkMode}>
//           You do not have permission to access this page. Contact your
//           administrator if you believe this is an error.
//         </PermissionDeniedMessage>
//       </CenteredContainer>
//     );
//   }

//   return (
//     <ParentContainer>
//       <AdminPanelContainer isDarkMode={isDarkMode}>
//         <p>Your Role: {userRole || "Loading role..."}</p>
//         <Title isDarkMode={isDarkMode}>Admin Panel</Title>
//         {/* RoleManager Component */}
//         <UserAdminProfile isDarkMode={isDarkMode} />
//         <Message>
//           Manage roles and permissions for users directly from this panel.
//         </Message>
//       </AdminPanelContainer>
//       <UserAdminDashboard isDarkMode={isDarkMode} />
//     </ParentContainer>
//   );
// };

// export default AdminPanel;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext"; // Use custom hook for auth
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";
import UserAdminProfile from "./UserAdminProfile";
import UserAdminDashboard from "./UserAdminDashboard";
import RoleManager from "./RoleManager";

const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
`;

const AdminPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px 15px 40px;
  /* max-width: 400px; */
  width: 95%;
  /* background-color: ${({ isDarkMode }) =>
    isDarkMode ? "#2E3136" : "#ffffff"}; */
  border-radius: 12px;
  /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); */
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  /* border: 1px solid #2e3136; */
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#f5f5f5" : "#2E3136")};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const PermissionDeniedMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#33363c")};
  text-align: center;
  font-weight: bold;
  padding: 10px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AdminPanel = ({ isDarkMode }) => {
  const { user, isLoading } = useAuth(); // Use user info from AuthContext
  const [role, setRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch user role from Firestore
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return; // Wait until user is authenticated
      try {
        const userDocRef = doc(firestore, "locations", user.uid); // Use Firestore path
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRole(userData.role); // Set role from Firestore
        } else {
          console.error("No such document in Firestore!");
          setRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole(null);
      } finally {
        setIsFetching(false); // Stop fetching state
      }
    };

    fetchUserRole();
  }, [user]);
  // Show loading state while fetching user role
  if (isLoading || isFetching) {
    return (
      <CenteredContainer>
        <p>Loading...</p>
      </CenteredContainer>
    );
  }
  // Restrict access for non-admin users
  if (role !== "admin") {
    return (
      <CenteredContainer>
        <PermissionDeniedMessage isDarkMode={isDarkMode}>
          You do not have permission to access this page. Contact your
          administrator if you believe this is an error.
        </PermissionDeniedMessage>
      </CenteredContainer>
    );
  }
  // Admin access granted
  return (
    <ParentContainer>
      <UserAdminDashboard isDarkMode={isDarkMode} />
    </ParentContainer>
  );
};

export default AdminPanel;
