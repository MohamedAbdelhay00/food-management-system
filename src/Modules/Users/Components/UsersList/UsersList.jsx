import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import axios from 'axios';
import { toast } from 'react-toastify';
import userImg from '../../../../imgs/freepik--Character--inject-70.png'

import './UsersList.css'

export default function UsersList() {

  const [usersList, setUsersList] = useState([]);

  const getUsers = async() => {
    let token = localStorage.getItem("adminToken")
    try {
      let response = await axios
        .get("https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1", {
          headers: {
            Authorization: token,
          }
        });
        setUsersList(response.data.data)
          // setTimeout(() => {
          //   toast.success("category added successfully", {position: "top-right"}), 100
          // })
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(()=> {
    getUsers()
  }, [])

  return (
    <>
      <Header title="Users " subTitle="List" description={'You can now add your items that any user can order it from the Application and you can edit'}/>
      <div className="info">
        <h4>Users Table Details</h4>
        <p>You can check all details</p>
      </div>
      <div>
        <table className="table text-center">
        <thead>
          <tr>
          <th>#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Image</th>
          <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
        {
  usersList.map(user => (
    <tr key={user.id}>
      <th scope='row'>{user.id}</th>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>
        {user.imagePath? <img className='img' src={`https://upskilling-egypt.com/${user.imagePath}`} alt="" /> :
        <img className='img' src={userImg} alt="" />}
      </td>
      <td>{user.phoneNumber}</td>
    </tr>
  ))
}

        </tbody>
        </table>
      </div>
    </>
  )
}
