import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IMG_7839 from "../images/IMG_7839.png";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${IMG_7839});
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
  margin: 0px 20px;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2E3136")};
  text-align: center;
  margin: 10px 0px 30px 0px;
`;

const SubTitle = styled.h3`
  margin: 0px 0px 20px;
  font-size: 14px;
  text-transform: uppercase;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  padding: 8px;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  border-radius: 5px;
  border: ${({ hasError }) =>
    hasError ? "1px solid red" : "1px solid #2e3136"};
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ hasError }) => (hasError ? "red" : "#a1a1a1")};
  }
`;

const Select = styled.select`
  padding: 8px;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  border-radius: 5px;
  border: ${({ hasError }) =>
    hasError ? "1px solid red" : "1px solid #2e3136"};
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.p`
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: bold;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: bold;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#5a6eaf" : "#2E3136")};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "#7289da" : "#40444b"};
  }
`;

const SignInPage = ({ isDarkMode }) => {
  const { user, signIn } = useAuth();
  const [formData, setFormData] = useState({
    locationName: "",
    contactPerson: "",
    address: "",
    locationType: "",
    subscriptionPlan: "",
    billingCycle: "",
    billingAddress: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && isSubmitting) {
      const saveData = async () => {
        try {
          const userDocRef = doc(firestore, "locations", user.uid);
          await setDoc(userDocRef, {
            ...formData,
            email: user.email, // Use the email from Google sign-in
            createdAt: new Date(),
          });
          console.log("Data saved successfully:", formData);
          setIsSubmitting(false);
          history.push("/"); // Redirect to home after save
        } catch (error) {
          console.error("Error saving data:", error);
          setIsSubmitting(false);
        }
      };
      saveData();
    }
  }, [user, isSubmitting, formData, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        newErrors[field] = "Please fill in this field.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        setIsSubmitting(true);
        await signIn();
      } catch (error) {
        console.error("Error during sign-in:", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <Container isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>Experience Setup</Title>
        {/* <SubTitle isDarkMode={isDarkMode}>for Partnered Venues</SubTitle> */}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <div>
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                type="text"
                id="locationName"
                name="locationName"
                placeholder={errors.locationName || "e.g., Downtown Museum"}
                value={formData.locationName}
                onChange={handleChange}
                hasError={!!errors.locationName}
              />
            </div>
            <div>
              <Label htmlFor="contactPerson">Primary Contact Person</Label>
              <Input
                type="text"
                id="contactPerson"
                name="contactPerson"
                placeholder={errors.contactPerson || "e.g., John Doe"}
                value={formData.contactPerson}
                onChange={handleChange}
                hasError={!!errors.contactPerson}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label htmlFor="address">Location Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder={errors.address || "e.g., 1234 Museum Lane"}
                value={formData.address}
                onChange={handleChange}
                hasError={!!errors.address}
              />
            </div>
            <div>
              <Label htmlFor="locationType">Location Type</Label>
              <Select
                id="locationType"
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
                hasError={!!errors.locationType}
              >
                <option value="" disabled>
                  {errors.locationType || "Select Type"}
                </option>
                <option value="museum">Museum</option>
                <option value="exhibit">Exhibit</option>
                <option value="gallery">Gallery</option>
                <option value="historical_site">Historical Site</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
              <Select
                id="subscriptionPlan"
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleChange}
                hasError={!!errors.subscriptionPlan}
              >
                <option value="" disabled>
                  {errors.subscriptionPlan || "Select Plan"}
                </option>
                <option value="basic">Free Temporary Access</option>
                <option value="premium">Premium Suite</option>
              </Select>
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select
                id="billingCycle"
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleChange}
                hasError={!!errors.billingCycle}
              >
                <option value="" disabled>
                  {errors.billingCycle || "Select Cycle"}
                </option>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual (Save 10%)</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                type="text"
                id="billingAddress"
                name="billingAddress"
                placeholder={errors.billingAddress || "e.g., Billing Dept"}
                value={formData.billingAddress}
                onChange={handleChange}
                hasError={!!errors.billingAddress}
              />
            </div>
          </FormGroup>
          <Button type="submit">Create Account</Button>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default SignInPage;
