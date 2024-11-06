import React, { useEffect, useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link, useHistory } from "react-router-dom"; // Use useHistory instead of useNavigate

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory(); // Initialize useHistory instead of useNavigate

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/"); // Use history.push instead of navigate
  };

  return (
    <>
      <header>
        <div className="container flex">
          <Link to="/" className="navbar-brand fw-bold">
            <span style={{ color: "#ffc107" }}>MGI</span> CANDLES
          </Link>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {!isLoggedIn ? (
              <>
                <button className="btn1">
                  <Link to="/login" className="fa fa-sign-in">
                    Login
                  </Link>
                </button>
                <button className="btn1">
                  <Link to="/register" className="fa fa-sign-out">
                    Register
                  </Link>
                </button>
              </>
            ) : (
              <button onClick={handleLogout} className="btn1" style={{ backgroundColor: "red", color: "white" }}>
                Logout
              </button>
            )}
          </div>
          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
