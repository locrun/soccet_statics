import React from "react";
import { Link } from "react-router-dom";
import wolf from "../images/dog.png";
import "./style.css";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" style={{ display: "inline-block" }}>
            <img className="logo" src={wolf} alt="logo" />
          </Link>
          <h1 className="header-title">Competitions</h1>
        </div>
      </div>
    </header>
  );
};
export default Header;
