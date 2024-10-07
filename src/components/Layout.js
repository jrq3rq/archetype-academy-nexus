import React from "react";

const Layout = ({ children, isDarkMode, toggleTheme }) => {
  const styles = {
    layout: {
      paddingTop: "60px", // Adjust this value based on your header's height
      minHeight: "100vh",
    },
  };

  return (
    <>
      <div style={styles.layout}>{children}</div>
    </>
  );
};

export default Layout;
