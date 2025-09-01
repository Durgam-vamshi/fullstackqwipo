




import React from "react";
import "./styles/Footer.css"; // Import the CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top section */}
        <div className="footer-top">
          
          {/* Branding */}
          <div className="footer-branding">
            <h2>Customer Management App</h2>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>

  
        </div>
      </div>
    </footer>
  );
}

export default Footer;
