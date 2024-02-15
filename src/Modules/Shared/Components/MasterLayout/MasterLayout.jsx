import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({ adminData }) {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3'>
                <SideBar />
            </div>
            <div className='col-md-9'>
                <NavBar adminData={adminData} />
                <Outlet />
            </div>
        </div>
    </div>
  )
}
