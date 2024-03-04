import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./SideBar.css";

import logo from "../../../../imgs/logo.png";
import ChangePassword from "../../../Authentication/Components/ChangePassword/ChangePassword";
import { ToastContainer } from "react-toastify";

export default function SideBar({ adminData, toggleSidebar}) {
  let token = localStorage.getItem("adminToken");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isCollapsed, setCollaps] = useState(false);
  const toggleCollapse = () => {
    setCollaps(!isCollapsed);
    toggleSidebar();
  };
  let navg = useNavigate();
  let logout = () => {
    localStorage.removeItem("adminToken");
    navg("/login");
  };
  return (
    <div className="sideTry">
      <div className="sidebar-container">
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePassword handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
        <Sidebar collapsed={isCollapsed} className=" position-sticky">
          <Menu>
            <div className="d-flex justify-content-center pt-5 px-3"
              onClick={toggleCollapse}
            >
              <img src={logo} className="colImg" alt="logo" />
            </div>
            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {
              adminData?.userGroup==='SuperAdmin'?
              <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>:''
            }
            <MenuItem
              icon={<i className="fa-solid fa-utensils"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>
            {
              adminData?.userGroup==='SystemUser'?
              <MenuItem
              icon={<i className="fa-solid fa-utensils"></i>}
              component={<Link to="/dashboard/favorites" />}
            >
              {" "}
              Favorites
            </MenuItem>:''
            }
            {
              adminData?.userGroup==='SuperAdmin'?
              <MenuItem
              icon={<i className="fa-solid fa-table-list"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              {" "}
              Categories
            </MenuItem>:''
            }
            <MenuItem
              icon={<i className="fa-solid fa-lock-open"></i>}
              onClick={handleShow}
              
            >
              {" "}
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              className=""
              onClick={logout}
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      {/* <button className='btn btn-danger' onClick={logout}>Logout</button> */}
    </div>
  );
}
