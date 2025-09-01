
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "../layouts/styles/Header.css"; // Import the CSS file

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo / Branding */}
        <h1 className="logo">Customer Management App</h1>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/customers" className="nav-link">Customers</Link>
          <Link to="/customers/new" className="nav-link">Add Customer</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX className="icon" /> : <HiMenu className="icon" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="nav-mobile">
          <ul>
            <li>
              <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/customers" className="nav-link" onClick={() => setIsOpen(false)}>
                Customers
              </Link>
            </li>
            <li>
              <Link to="/customers/new" className="nav-link" onClick={() => setIsOpen(false)}>
                Add Customer
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
