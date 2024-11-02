// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ArchetypeChatbotUI from "./components/ArchetypeChatbotUI";
import ScrollToTop from "./components/ScrollToTop";
import { ChatbotProvider } from "./state/ChatbotContext";
import Footer from "./components/Footer";
import EnhancedPersonalityTest from "./pages/EnhancedPersonalityTest";
import ArchetypeLibraryPage from "./pages/ArchetypeLibraryPage";
import Header from "./components/Header";
import MuseumQuestionsTest from "./pages/MuseumQuestionsPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyles = {
    backgroundColor: isDarkMode ? "#1F2124" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "background-color 0.3s, color 0.3s",
  };

  return (
    <AuthProvider>
      <ChatbotProvider>
        <Router>
          <div style={appStyles}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <ScrollToTop />
            <Layout>
              <Switch>
                <Route exact path="/">
                  <HomePage isDarkMode={isDarkMode} />
                </Route>
                <Route path="/library">
                  <ArchetypeLibraryPage isDarkMode={isDarkMode} />
                </Route>
                {/* <Route path="/chatbot">
                  <ArchetypeChatbotUI isDarkMode={isDarkMode} />
                </Route> */}

                <ProtectedRoute
                  path="/chatbot"
                  component={ArchetypeChatbotUI}
                  requiredRole="user" // Ensure role consistency
                  redirectPath="/signin"
                  isDarkMode={isDarkMode}
                />
                <Route path="/assessment">
                  <EnhancedPersonalityTest isDarkMode={isDarkMode} />
                </Route>
                {/* <Route path="/museum-assessment">
                  <MuseumQuestionsTest isDarkMode={isDarkMode} />
                </Route> */}
                <ProtectedRoute
                  path="/museum-assessment"
                  component={MuseumQuestionsTest}
                  requiredRole="user" // Ensure role consistency
                  redirectPath="/signin"
                  isDarkMode={isDarkMode}
                />
                <Route path="/signin">
                  <SignInPage isDarkMode={isDarkMode} />
                </Route>
                <Route path="/page">
                  <UserProfile isDarkMode={isDarkMode} />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Layout>
            <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </Router>
      </ChatbotProvider>
    </AuthProvider>
  );
};

export default App;
