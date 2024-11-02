// src/components/UserProfile.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#1e2124" : "#f0f0f0")};
`;

const ProfileCard = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2c2f33" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2e3136")};
  border-radius: 10px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ProfileHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#7289da" : "#5a6eaf")};
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
  color: ${({ isDarkMode }) => (isDarkMode ? "#dcdcdc" : "#333")};
`;

const FieldLabel = styled.span`
  font-weight: bold;
  color: ${({ isDarkMode }) => (isDarkMode ? "#7289da" : "#5a6eaf")};
`;

const UserProfile = ({ isDarkMode }) => {
  const { user, userData, isLoading } = useAuth();

  if (isLoading) {
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
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>Location Name:</FieldLabel>{" "}
                {userData.locationName}
              </DataField>
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>Contact Person:</FieldLabel>{" "}
                {userData.contactPerson}
              </DataField>
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>
                  Location Address:
                </FieldLabel>{" "}
                {userData.locationAddress}
              </DataField>
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>Location Type:</FieldLabel>{" "}
                {userData.locationType}
              </DataField>
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>
                  Subscription Plan:
                </FieldLabel>{" "}
                {userData.subscriptionPlan}
              </DataField>
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>Billing Cycle:</FieldLabel>{" "}
                {userData.billingCycle}
              </DataField>
              <DataField>
                <FieldLabel isDarkMode={isDarkMode}>
                  Billing Address:
                </FieldLabel>{" "}
                {userData.billingAddress}
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

export default UserProfile;
