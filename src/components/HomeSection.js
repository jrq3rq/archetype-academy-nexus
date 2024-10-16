import React from "react";
import { FaUserCircle, FaPuzzlePiece, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom"; // <-- Add this import
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background-color: ${(props) => (props.isDarkMode ? "#1e2124" : "#ffffff")};
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  font-family: Arial, sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1210px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  @media (max-width: 768px) {
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left;
  color: ${(props) => (props.isDarkMode ? "#b9bbbe" : "#333333")};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Description2 = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 25px;
  text-align: left;
  color: ${(props) => (props.isDarkMode ? "#b9bbbe" : "#333333")};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Ensure the cards are centered */
  }
`;

const FeatureCard = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#ffffff" : "#2E3136")};
  border-radius: 12px;
  padding: 40px;
  width: 300px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin: 0 auto;
  border: 1px solid #2e3136;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 90%;
    padding: 20px;
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: ${(props) => (props.isDarkMode ? "#333333" : "#ffffff")};
`;

const FeatureTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${(props) => (props.isDarkMode ? "#000000" : "#ffffff")};
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${(props) => (props.isDarkMode ? "#666666" : "#b9bbbe")};
  text-align: left;
`;

const CTAButton = styled(Link)`
  // Make sure 'Link' is imported from 'react-router-dom'
  display: inline-block;
  background-color: ${(props) => (props.isDarkMode ? "#2f3136" : "#ffffff")};
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  padding: 12px 24px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6eaf;
  }
`;

// React Component
const HomeSection = ({ isDarkMode }) => {
  return (
    <Container isDarkMode={isDarkMode}>
      <ContentWrapper>
        <Title isDarkMode={isDarkMode}>Welcome to The Archetype Academy</Title>
        <Description isDarkMode={isDarkMode}>
          {/* The Archetype Academy is an AI-driven platform that personalizes
          museum experiences based on Jungian archetypes. Visitors engage with
          exhibits tailored to their unique personality, enhancing their journey
          through interactive storytelling, challenges, and guided paths.
          Discover a whole new way to explore. */}
          The Archetype Academy is focused on building a cutting-edge,
          subscription-based engagement platform designed to revolutionize
          interactive exhibits. Powered by AI and grounded in Jungian
          archetypes, the platform will personalize each visitor’s journey by
          adapting experiential spaces to match their unique personality.
          Visitors will engage with these tailored experiences in new ways,
          immersing themselves in personalized storytelling, interactive
          challenges, and guided explorations. This dynamic platform will create
          ever-evolving, meaningful connections with immersive content.
        </Description>

        <Description2 isDarkMode={isDarkMode}>
          For institutions and organizations, The Archetype Academy will unlock
          new subscription-based models to enhance audience engagement, offering
          fresh, personalized experiences with every interaction.
        </Description2>

        <FeaturesContainer>
          <FeatureCard isDarkMode={isDarkMode}>
            <Icon isDarkMode={isDarkMode}>
              <FaUserCircle />
            </Icon>
            <FeatureTitle isDarkMode={isDarkMode}>
              Personalized Experiences
            </FeatureTitle>
            <FeatureDescription isDarkMode={isDarkMode}>
              Each visitor takes the MindPulse150 personality test to uncover
              their archetype. This determines their unique journey through
              personalized interactions, tailored to their personality and
              engagement style, offering custom experiences in any interactive
              space.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDarkMode={isDarkMode}>
            <Icon isDarkMode={isDarkMode}>
              <FaPuzzlePiece />
            </Icon>
            <FeatureTitle isDarkMode={isDarkMode}>
              AI-Driven Engagement
            </FeatureTitle>
            <FeatureDescription isDarkMode={isDarkMode}>
              With Archédex, our AI-powered guide, visitors receive real-time
              personalized guidance, dynamic storytelling, and interactive
              challenges that adapt to their archetype, ensuring a tailored and
              immersive experience.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDarkMode={isDarkMode}>
            <Icon isDarkMode={isDarkMode}>
              <FaChartLine />
            </Icon>
            <FeatureTitle isDarkMode={isDarkMode}>
              Advanced Analytics
            </FeatureTitle>
            <FeatureDescription isDarkMode={isDarkMode}>
              Organizations can track visitor engagement through our analytics
              dashboard, gaining insights into behavior patterns, archetype
              trends, and overall performance of interactive experiences.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </ContentWrapper>
    </Container>
  );
};

export default HomeSection;
