import "./Nav.css";
import React from "react";
import "./Nav.css";
import library from "./library.png";
import images from "./images.jpg";
// import Axios from "axios";

const Nav = (props) => {
  return (
    <div>
      <div className="header">
        <ul className="headerlist">
          <img src={images} className="logo" />
          <a href="/">Home</a>
          <a href="/borrow">Issue Book</a>
          <a href="/return">Return</a>
          <a href="/search">Search</a>
          {/* <a href="/addbook">Add Book</a> */}
          <a href="/login" className="login-btn">
            Login
          </a>
        </ul>
      </div>
      <h1>{props.title}</h1>
      <h3>{props.description}</h3>
    </div>
  );
};

export default Nav;
