import React from "react";
import "./Header.css";
import Logo from "./assets/Logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="logo" />
      <div className="nav">
        <button className="btn">Users</button>
        <button className="btn">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
