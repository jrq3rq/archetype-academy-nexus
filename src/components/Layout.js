import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  const styles = {
    layout: {
      paddingTop: "60px", // Adjust this value based on your header's height
      minHeight: "100vh",
      backgroundColor: "#1e2124",
    },
  };

  return (
    <>
      <Header />
      <div style={styles.layout}>{children}</div>
    </>
  );
};

export default Layout;
