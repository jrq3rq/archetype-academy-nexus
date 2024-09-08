import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ArchetypeChatbotPage from "./pages/ArchetypeChatbotPage";
import ArchetypeLibraryPage from "./pages/ArchetypeLibraryPage";
import UserProfilePage from "./pages/UserProfilePage";
import ArchetypeChatbotUI from "./components/ArchetypeChatbotUI";
import ScrollToTop from "./components/ScrollToTop";
import { ChatbotProvider } from "./state/ChatbotContext"; // Import the ChatbotProvider
import Footer from "./components/Footer";

const App = () => {
  return (
    <ChatbotProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/chatbot" component={ArchetypeChatbotUI} />
            <Route path="/library" component={ArchetypeLibraryPage} />
            {/* <Route path="/profile" component={UserProfilePage} /> */}
          </Switch>
        </Layout>
      </Router>
    </ChatbotProvider>
  );
};

export default App;
