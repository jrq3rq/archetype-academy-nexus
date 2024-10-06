import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ArchetypeChatbotUI from "./components/ArchetypeChatbotUI";
import ScrollToTop from "./components/ScrollToTop";
import { ChatbotProvider } from "./state/ChatbotContext";
import Footer from "./components/Footer";
import EnhancedPersonalityTest from "./pages/EnhancedPersonalityTest";
import ArchetypeLibraryPage from "./pages/ArchetypeLibraryPage"; // Import your other pages here

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyles = {
    backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "background-color 0.3s, color 0.3s",
  };

  return (
    <ChatbotProvider>
      <Router>
        <div style={appStyles}>
          <ScrollToTop />
          <Layout>
            <Switch>
              <Route exact path="/">
                <HomePage isDarkMode={isDarkMode} />
              </Route>
              <Route path="/chatbot">
                <ArchetypeChatbotUI isDarkMode={isDarkMode} />
              </Route>
              <Route path="/library">
                <ArchetypeLibraryPage isDarkMode={isDarkMode} />
              </Route>
              <Route path="/assessment">
                <EnhancedPersonalityTest isDarkMode={isDarkMode} />
              </Route>
            </Switch>
          </Layout>
          <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
      </Router>
    </ChatbotProvider>
  );
};

export default App;
