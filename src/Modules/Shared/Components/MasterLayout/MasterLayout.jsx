import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';

export default function MasterLayout({ adminData }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarWidth = isSidebarCollapsed ? '80px' : '250px'; // Adjust these values to match your actual sidebar width

  let navg = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    navg("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className='d-flex position-relative'>
      <div className='sidebar position-fixed top-0 bottom-0 left-0 z-3 ' style={{ width: sidebarWidth }}>
        <SideBar toggleSidebar={toggleSidebar} adminData={adminData} logout={logout}/>
      </div>
      <div className='w-100 container' style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s ease' }}>
        <NavBar adminData={adminData} logout={logout}/>
        <Outlet />
      </div>
    </div>
  )
}