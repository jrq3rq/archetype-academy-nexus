// src/components/UserProfile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 100vh; */
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#404449" : "#F0F0F0")};
  border: 1px solid #2e3136;
`;

const ProfileCard = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#F0F0F0")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#F0F0F0" : "#2e3136")};
  border-radius: 10px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); */
  /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); */
  text-align: center;
  /* border: 1px solid #2e3136; */
`;

const ProfileHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
`;

const ProfileSubHeader = styled.h4`
  font-size: 18px;
  font-weight: 400;
  color: ${({ isDarkMode }) => (isDarkMode ? "#b0b3b8" : "#555")};
  margin-bottom: 25px;
`;

const ProfileData = styled.div`
  text-align: left;
`;

const DataField = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
`;

const FieldLabel = styled.span`
  font-weight: bold;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
`;

const UserAdminProfile = ({ isDarkMode }) => {
  const { user, isLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "locations", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log("No user data found!");
        }
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (isLoading || loadingData) {
    return <ProfileWrapper isDarkMode={isDarkMode}>Loading...</ProfileWrapper>;
  }

  if (!user) {
    return (
      <ProfileWrapper isDarkMode={isDarkMode}>
        <ProfileCard isDarkMode={isDarkMode}>
          <ProfileHeader isDarkMode={isDarkMode}>
            No user is logged in.
          </ProfileHeader>
        </ProfileCard>
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper isDarkMode={isDarkMode}>
      <ProfileCard isDarkMode={isDarkMode}>
        <ProfileHeader isDarkMode={isDarkMode}>
          Welcome, {user.displayName || user.email}
        </ProfileHeader>
        <ProfileSubHeader isDarkMode={isDarkMode}>
          User Profile Details
        </ProfileSubHeader>
        <ProfileData>
          {userData ? (
            <>
              <DataField isDarkMode={isDarkMode}>
                <FieldLabel isDarkMode={isDarkMode}>Location Name:</FieldLabel>{" "}
                {userData.locationName}
              </DataField>
              <DataField isDarkMode={isDarkMode}>
                <FieldLabel isDarkMode={isDarkMode}>
                  Billing Address:
                </FieldLabel>{" "}
                {userData.billingAddress}
              </DataField>
              <DataField isDarkMode={isDarkMode}>
                <FieldLabel isDarkMode={isDarkMode}>Contact Person:</FieldLabel>{" "}
                {userData.contactPerson}
              </DataField>
              <DataField isDarkMode={isDarkMode}>
                <FieldLabel isDarkMode={isDarkMode}>Location Type:</FieldLabel>{" "}
                {userData.locationType}
              </DataField>
              <DataField isDarkMode={isDarkMode}>
                <FieldLabel isDarkMode={isDarkMode}>
                  Subscription Plan:
                </FieldLabel>{" "}
                {userData.subscriptionPlan}
              </DataField>
              <DataField isDarkMode={isDarkMode}>
                <FieldLabel isDarkMode={isDarkMode}>Billing Cycle:</FieldLabel>{" "}
                {userData.billingCycle}
              </DataField>
            </>
          ) : (
            <DataField isDarkMode={isDarkMode}>
              No additional user data available.
            </DataField>
          )}
        </ProfileData>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default UserAdminProfile;
