import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import "./CategoriesList.css";

import Modal from "react-bootstrap/Modal";

import noDataImg from "../../../../imgs/freepik--Character--inject-70.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UpdateCate from "./UpdateCate";
import DeleteCate from "./DeleteCate";

export default function CategoriesList() {
  const [categories, setCategorites] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [searchByName, setSearchByName] = useState("");

  let [id, setId] = useState();

  const [pageSize, setPageSize] = useState([]);

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting },
  } = useForm();

  let token = localStorage.getItem("adminToken");

  const getCategoriesData = async (pageNo, pageSize, name) => {
    try {
      let categories = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        {
          headers: {
            Authorization: token,
          }, 
          params: {
            pageSize: pageSize,
            pageNumber: pageNo,
            name: name,
          }
        }
      );
      setPageSize(
        Array(categories.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategorites(categories.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      let response = await axios
        .post("https://upskilling-egypt.com:443/api/v1/Category/", data, {
          headers: {
            Authorization: token,
          }
        });
        handleClose()
        reset()
        setTimeout(() => {
          toast.success("category added successfully", {position: "top-right"});
        }, 100);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const getNameValue = (e) => {
    setSearchByName(e.target.value);
    getCategoriesData(1, 10, e.target.value);
  };

  useEffect(() => {
    getCategoriesData(1, 5);
  }, []);

  return (
    <>
      <Header
        title="Categories "
        subTitle="List"
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="categories-container py-4">
        <div className="d-flex justify-content-between">
          <div>
            <h6>Categories Table Details</h6>
            <span className="text-body-tertiary">
              You can check all details
            </span>
          </div>
          <div>
            <button className="btn btn-success px-4" onClick={handleShow}>
              Add New Item
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <input type="text" placeholder="Search by name" onChange={getNameValue} className=" form-control w-75 my-3"/>
        </div>
        <div className="table-contaienr">
          {categories.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td>
                      <div>
                        <button className="btn btn-light m-1" onClick={() => { handleShowUpdate(); setId(category.id); }}>Update</button>
                        <button className="btn btn-danger m-1" onClick={() => { handleShowDelete(); setId(category.id); }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="d-flex flex-column align-items-center noDataImg">
              <img src={noDataImg} className="py-3" alt="no-data" />
              <h6>No Data !</h6>
              <p className="text-body-tertiary">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
          )}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
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
                getCategoriesData(page, 5);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="cateField d-flex flex-column align-items-center my-3">
              <input
                type="text"
                className="py-2 px-2 w-100 rounded border-0"
                placeholder="Category Name"
                {...register("name", {
                    required: "Name is required",
                  })}
              />
              <div className="w-100">
                {errors.name && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <Modal.Footer>
              <div className="d-flex justify-content-end">
              <button disabled={isSubmitting} className="btn btn-success w-100">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Save'
        )}
              </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateCate handleCloseUpdate={handleCloseUpdate} id={id}/>
        </Modal.Body>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteCate handleCloseDelete={handleCloseDelete} id={id}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
