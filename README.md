<!-- [![Carl-XII](https://img.shields.io/badge/-Carl--XII-blue?style=for-the-badge)](https://carl-xii.web.app/) -->

## The Archetype Character Academy

```markdown
AlphaV3/
├── backend-functions/
│ ├── .env
│ ├── index.js
│ ├── package.json
│ ├── testCustomClaims.js
│ └── ...
├── public/
│ ├── index.html
│ ├── favicon.ico
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── ...
src/
├── assets/
│   └── (static files like images and icons)
├── components/
│   ├── AdminPanel.js
│   ├── ArchetypeCard.jsx
│   ├── ArchetypeChatbotUI.js
│   ├── assignAdminRole.js
│   ├── BackgroundImageComponent.js
│   ├── CardGrid.js
│   ├── CheckRole.js
│   ├── ColorCyclingContainer.js
│   ├── Dashboard.js
│   ├── ErrorBoundary.js
│   ├── ErrorMessage.jsx
│   ├── Footer.js
│   ├── Header.js
│   ├── HomeSection.js
│   ├── Layout.js
│   ├── LikertScale.js
│   ├── LoadingSpinner.jsx
│   ├── LocationList.js
│   ├── NavigationButtons.jsx
│   ├── OptionCard.js
│   ├── PasswordSetupModal.js
│   ├── QrCodeGenerator.js
│   ├── QuestionSection.jsx
│   ├── ReCaptchaComponent.css
│   ├── RecaptchaGate.js
│   ├── ResultsModal.jsx
│   ├── RoleManager.js
│   ├── ScrollToTop.js
│   ├── SectionSeparator.js
│   ├── SetUserRoleComponent.js
│   ├── Toast.js
│   ├── ToggleSwitch.js
│   ├── UserAdminDashboard.js
│   └── UserAdminProfile.js
├── context/
│   └── AuthContext.js
├── data/
│   └── archetypes.js
├── hooks/
│   └── useFetchQuestions.js
├── images/
│   ├── AcademyARVR.png
│   ├── IMG_7839.png
│   └── SQUARE.png
├── pages/
│   ├── ArchetypeChatbotPage.js
│   ├── ArchetypeLibraryPage.js
│   ├── EnhancedPersonalityTest.js
│   ├── HomePage.js
│   ├── MuseumQuestionsPage.js
│   ├── ProtectedDashboard.js
│   ├── SignInPage.js
│   └── UserProfile.js
├── routes/
│   └── ProtectedRoute.js
├── services/
│   ├── archetypeService.js
│   └── firebaseConfig.js
├── state/
│   └── ChatbotContext.js
├── utils/
│   └── colorUtils.js
├── App.css
├── App.js
├── index.css
├── index.js
└── test/
├── .env // Environment variables
├── .gitignore
├── firebase.json
├── package.json
├── package-lock.json
└── README.md
```
# The Archetype Academy: Comprehensive App Flow and Feature Overview

**The Archetype Academy** is an AI-powered platform designed to provide immersive, personalized experiences based on Jungian archetypes. It combines interactive quizzes, AI-driven storytelling, and community engagement to create a unique, engaging environment for users. This README outlines the core functionality, features, and flow of the app, making it easier for contributors, developers, and collaborators to understand and enhance the project.

---

## Core Features and Flow

### **1. User Entry Point**
- **Landing Page**: Hosted on Firebase, users can explore the app and its features upon arrival.
- **Anonymous Access**: Users can interact with the app without signing in, allowing them to try personality assessments and explore basic content.

### **2. Personality Assessment**
- **Interactive Quiz**: Users engage with quizzes (e.g., EnhancedPersonalityTest.js or MuseumQuestionsPage.js) that identify Jungian archetypes and provide tailored insights.
- **Results Handling**:
  - Results are stored temporarily for anonymous users.
  - Users are prompted to create an account to save their results permanently and unlock additional features.

### **3. Authentication and User Role Management**
- **Sign In Options**: Users can sign in with Google via Firebase Authentication, which creates a Firestore profile automatically.
- **Role Assignment**:
  - Default users are assigned the “user” role.
  - Admins are designated or assigned by other admins through the **RoleManager** component.

### **4. Archetype Experiences**
- **AI-Guided Storytelling**:
  - The **Archédex Chatbot** delivers personalized interactions and immersive experiences based on quiz results.
- **Community Engagement**:
  - Users can share milestones and compare progress with others in the same archetype category.

### **5. Admin Panel**
- **Access Control**: Admins use role-based authentication to access the dashboard.
- **Admin Tools**:
  - Password-protected dashboard for secure management of user data, quiz results, and archetype analytics.
  - Role management through Firebase Functions (e.g., `setUserRole`).

### **6. Community Features**
- **Shared Milestones**: Encourages collaboration and discussion among users with similar archetypes.
- **Gamification** (Future Feature): Users earn badges or level up based on participation and progress.

### **7. Data Handling and Storage**
- **Firestore Integration**:
  - User profiles and quiz results are securely stored and mapped to unique IDs.
  - Firestore rules enforce role-based access, ensuring data privacy and security.

### **8. Application Deployment**
- **Firebase Hosting**: Frontend is deployed on Firebase.
- **Custom Functions**:
  - Backend logic for role management and Firestore operations.
  - Local development supported by Firebase emulators.

### **9. Future Features**
- **Gamification**: Introduce rewards for completing quizzes and milestones.
- **VR Campus**: Immersive virtual reality experiences centered on archetypes.
- **Custom AI Companions**: Personalized AI guides tailored to each user’s archetype.
- **Subscription Billing**: Premium features via a subscription model managed through Stripe or similar platforms.

---

## End-to-End Example Flow
**User Perspective**:
1. **Visit the App**: Users arrive at the app and take a personality test.
2. **Complete Quiz**: Results are generated, with an option to save them by creating an account.
3. **Sign In**: Users sign in via Google, enabling them to save results and access additional features.
4. **Explore Experiences**: Engage with AI-driven storytelling and archetype-focused content.
5. **Admin Interaction (if applicable)**: Admins log in to assign roles, manage data, or analyze user engagement.
6. **Revisit**: Users return to access saved results or continue their journey.

---

## Technology Stack
- **Frontend**: React.js
- **Backend**: Firebase Functions
- **Database**: Firestore
- **Authentication**: Firebase Authentication with custom claims for role management
- **Deployment**: Firebase Hosting
- **Development Tools**: Firebase Emulator Suite for local testing

---

The Archetype Academy is a growing platform, and your contributions are vital to its success. Feel free to suggest enhancements, report bugs, or share feedback!


```css
            [ Archetype-Academy-nexus-v3 ]
                     /     |      \
                    /      |       \
                   /       |        \
  [Character Creation] [Interaction] [Customization]
```

[![ArchetypeAPI](https://img.shields.io/badge/-ArchetypeAPI-orange?style=for-the-badge)](https://us-central1-archetype-builder-api.cloudfunctions.net/api/archetypes)

| **Character Creation** |   **Character Interaction**    | **Character Customization**  |
| :--------------------: | :----------------------------: | :--------------------------: |
| Uses ArchetypeAPI data | Enriched by MindPulse-150 data | Combines data from both APIs |

### Character Creation

- Utilizes data from **ArchetypeAPI**

### Interaction

- Enriched by personality data from **MindPulse-150**

### Customization

- Combines data from **ArchetypeAPI** and insights from **MindPulse-150**
