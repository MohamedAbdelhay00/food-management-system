import React from 'react'
import './NotFound.css'
import logo from '../../../../imgs/logo1.jpg'
import bgL1 from '../../../../imgs/Vector.png'
import bgL2 from '../../../../imgs/Group 48101676.png'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

  let naigate = useNavigate();

  const navgToHome = () => {
    naigate('/dashboard');
  }

  return (
    <div className='not-found'>
      <div className=''>
          <div className='bgl1 row w-100 justify-content-between'>
          <div className='d-flex flex-column align-items-center col-md-4'>
          <img src={logo} alt="logo" className='w-75 my-4 mx-2'/>
          <div className='m-4'>
            <h2 className=' fw-bolder '>Oops. <br /><span className=' fw-normal text-success'>Page  not found </span><br /> ...</h2>
            <button onClick={navgToHome} className='btn btn-success px-5 py-3'><i className="fa-solid fa-arrow-left"></i> Back To Home</button>
          </div>
        </div>
        <div className='col-md-8 bgl2'>
        {/* <img src={bgL2} alt="bgL2"/> */}
        </div>
          </div>
        </div>
      </div>
  )
}
