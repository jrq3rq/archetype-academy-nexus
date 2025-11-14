import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext"; // Use custom hook for auth
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";
import UserAdminProfile from "./UserAdminProfile";
import RoleManager from "./RoleManager";
import Toast from "./Toast";

// Styled Components
const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#1E1E2F" : "#F5F5F5")};
`;

const UnifiedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px 20px;
  max-width: 1200px;
  width: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#ffffff")};
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  border: 1px solid #2e3136;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#f5f5f5" : "#2E3136")};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Section = styled.div`
  width: 100%;
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
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const InfoValue = styled.span`
  margin-left: 8px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#44FD47" : "#2E3136")};
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#7289DA" : "#2E3136")};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#5865F2" : "#40444b"};
  }
`;

const PermissionDeniedMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#33363c")};
  text-align: center;
  font-weight: bold;
  padding: 10px;
`;

// Unified Component
const UnifiedAdminDashboard = ({ isDarkMode }) => {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(firestore, "locations", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData(data);
          setRole(data.role || "user");
        } else {
          console.error("User document not found!");
          setRole(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (isFetching) {
    return (
      <ParentContainer>
        <p>Loading...</p>
      </ParentContainer>
    );
  }

  if (!role || (role !== "admin" && role !== "user")) {
    return (
      <ParentContainer>
        <PermissionDeniedMessage isDarkMode={isDarkMode}>
          Access Denied: You do not have permission to view this page.
        </PermissionDeniedMessage>
      </ParentContainer>
    );
  }

  return (
    <ParentContainer>
      <UnifiedContainer isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </Title>

        {/* Account Information */}
        <Section isDarkMode={isDarkMode}>
          <SectionTitle isDarkMode={isDarkMode}>
            Account Information
          </SectionTitle>
          <InfoRow>
            <InfoLabel>Location Name:</InfoLabel>
            <InfoValue isDarkMode={isDarkMode}>
              {userData?.locationName || "Not provided"}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Contact Person:</InfoLabel>
            <InfoValue isDarkMode={isDarkMode}>
              {userData?.contactPerson || "Not provided"}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue isDarkMode={isDarkMode}>{user?.email}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Role:</InfoLabel>
            <InfoValue isDarkMode={isDarkMode}>{role}</InfoValue>
          </InfoRow>
          <Button isDarkMode={isDarkMode} onClick={signOut}>
            Sign Out
          </Button>
        </Section>

        {/* Role-Specific Tools */}
        {role === "admin" && (
          <Section isDarkMode={isDarkMode}>
            <SectionTitle isDarkMode={isDarkMode}>Admin Tools</SectionTitle>
            <UserAdminProfile isDarkMode={isDarkMode} />
            <RoleManager isDarkMode={isDarkMode} />
          </Section>
        )}
      </UnifiedContainer>
      {showToast && <Toast message="Data updated successfully" />}
    </ParentContainer>
  );
};

export default UnifiedAdminDashboard;
