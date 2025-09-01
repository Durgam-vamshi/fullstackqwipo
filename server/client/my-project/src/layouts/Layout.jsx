import React from "react";
import Header from "./Header"; // Import your custom Header
import Footer from "./Footer"; // Import your custom Footer

function Layout({ children }) {
  return (
    <div className="layout-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, padding: "16px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
