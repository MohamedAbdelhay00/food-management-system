import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
  let navg = useNavigate();
  let logout = () => {
    localStorage.removeItem("adminToken");
    navg('/login')
  }
  return (
    <div>
      <button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
  )
}
