import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import uImg from "../../../../imgs/logo.png";
import "./NavBar.css";
export default function NavBar({ adminData, logout }) {
  return (
    <div className="py-4">
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3">
        <div className="container-fluid">
          <div className="wrapper w-75">
            <div className="icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              className="input py-2 w-100 rounded-5 border-0 px-5"
              placeholder="Search here"
            ></input>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ps-5">
              <li className="nav-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img src={uImg} className="userImg" alt="userImg" />
                  <Nav>
                    <NavDropdown
                      title={adminData?.userName}
                    >
                      <NavDropdown.Item className="bg-white text-danger" onClick={logout}>
                      <i className="fa-solid fa-right-from-bracket px-2"></i>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </div>
              </li>
              <li className="nav-item d-flex align-items-center">
              <i className="fa-solid fa-bell"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
