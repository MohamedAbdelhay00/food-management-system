import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import axios from 'axios';
import { toast } from 'react-toastify';
import userImg from '../../../../imgs/freepik--Character--inject-70.png'

import './UsersList.css'

export default function UsersList() {

  const [usersList, setUsersList] = useState([]);

  const [pageSize, setPageSize] = useState([]);
  const [pageNumber, setPageNumber] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [groups, setGroups] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [searchByName, setSearchByName] = useState("");
  const [searchByCountry, setSearchByCountry] = useState("");
  const [searchByGroup, setSearchByGroup] = useState(0);


  const getUsers = async(pageNo, pageSize, name, country, groups, ) => {
    setIsLoading(true);
    let token = localStorage.getItem("adminToken")
    try {
      let response = await axios
        .get("https://upskilling-egypt.com:443/api/v1/Users/", {
          headers: {
            Authorization: token,
          }, 
          params: {
            userName: name, 
            country: country, 
            groups: groups, 
            pageSize: pageSize, 
            pageNumber: pageNo, 
          }, 
        });
        setPageSize(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setUsersList(response.data.data)
          // setTimeout(() => {
          //   toast.success("category added successfully", {position: "top-right"}), 100
          // })
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
  }

  const getNameValue = (e) => {
    setSearchByName(e.target.value);
    getUsers(1, 10, e.target.value);
  };

  const getCountryValue = (select) => {
    setSearchByCountry(select.target.value);
    getUsers(1, 10, searchByName, select.target.value);
  };

  const getGroupValue = (select) => {
    setSearchByGroup(select.target.value);
    getUsers(1, 5, searchByName, searchByCountry, select.target.value);
  };

  useEffect(()=> {
    getUsers(pageNumber, 5)
  }, [])

  return (
    <>
      <Header title="Users " subTitle="List" description={'You can now add your items that any user can order it from the Application and you can edit'}/>
      <div className="info">
        <h4>Users Table Details</h4>
        <p>You can check all details</p>
      </div>
      <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className=" form-control w-100"
              placeholder="search by name"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className=" form-control w-100"
              placeholder="search by country"
              onChange={getCountryValue}
            />
          </div>
          <div className="col-md-3">
            <div className="input-group flex-nowrap">
              <select
                className="form-control text-black"
                onChange={getGroupValue}
              >
                <option value="">search by group</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
                {/* {usersList?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          {/* <div className="col-md-3">
            <div className="input-group flex-nowrap">
              <select
                className="form-control text-black"
                onChange={getTagValue}
              >
                <option value="">search by tag</option>
                {tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
        </div>
      <div>
        <table className="table text-center table-responsive">
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
        <nav aria-label="Page navigation example">
        <ul className="pagination flex-pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageSize.map((page) => (
            <li
              key={page}
              className="page-item"
              onClick={() => {
                getUsers(page, 5);
              }}
            >
              <a className="page-link">{page}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </>
  )
}
