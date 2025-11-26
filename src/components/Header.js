import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={{ padding: "10px", background: "#333", display: "flex", alignItems: "center" }}>
      {/* Logo ya Site Name */}
      <Link 
        to="/" 
        style={{ 
          color: "#fff", 
          textDecoration: "none", 
          fontWeight: "700", 
          fontSize: "20px" 
        }}
      >
        MyNewsPortal
      </Link>
    </nav>
  );
}

export default Header
