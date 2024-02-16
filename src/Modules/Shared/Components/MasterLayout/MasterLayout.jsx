import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Header/Header';

export default function MasterLayout({ adminData }) {
    let navg = useNavigate();
    const logout = () => {
        localStorage.removeItem("adminToken");
        navg("/login");
      };
  return (
        <div className='d-flex'>
            <div className=''>
                <SideBar logout={logout}/>
            </div>
            <div className='w-100 container'>
                <NavBar adminData={adminData} logout={logout}/>
                <Outlet />
            </div>
        </div>
  )
}
