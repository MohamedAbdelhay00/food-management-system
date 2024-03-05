import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import { toast } from "react-toastify";
import axios from "axios";
import userImg from "../../../../imgs/freepik--Character--inject-70.png";
import DeleteRe from "./DeleteRe";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [categories, setCategorites] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByTagId, setSearchByTagId] = useState("");
  const [searchByCateId, setSearchByCateId] = useState("");
  const [pageSize, setPageSize] = useState([]);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const loginData = JSON.parse(localStorage.getItem("loginData"));

  const getRecipes = async (pageNo, pageSize, name, tagId, catId) => {
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        {
          headers: {
            Authorization: token,
          },
          params: {
            name: name,
            tagId: tagId,
            categoryId: catId,
            pageSize: pageSize,
            pageNumber: pageNo,
          },
        }
      );
      console.log(response.data.totalNumberOfPages);
      setPageSize(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipesList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigToAddNew = () => {
    navigate("/dashboard/recipes-data");
  };

  const navigToUpdate = (id) => {
    navigate(`/dashboard/update/${id}`);
  };

  const getCategoriesData = async () => {
    let token = localStorage.getItem("adminToken");
    try {
      let categories = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=5&pageNumber=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCategorites(categories.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTagsData = async () => {
    let token = localStorage.getItem("adminToken");
    try {
      let tags = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTags(tags?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes();
    getCategoriesData();
    getTagsData();
  }, []);

  const getNameValue = (e) => {
    setSearchByName(e.target.value);
    getRecipes(1, 10, e.target.value, searchByTagId, searchByCateId);
  };

  const getCateValue = (select) => {
    setSearchByCateId(select.target.value);
    getRecipes(1, 10, searchByName, searchByTagId, select.target.value);
  };

  const getTagValue = (select) => {
    setSearchByTagId(select.target.value);
    getRecipes(1, 10, searchByName, select.target.value, searchByCateId);
  };

  const addToFav = async(id) => {
    try {
      let token = localStorage.getItem("adminToken");
      let req = await axios.post(
        `https://upskilling-egypt.com:443/api/v1/userRecipe`,
        { recipeId: id},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(req);
      toast.success("Added to favorites");
    } catch (err) {
      console.log(err);
      toast.error(err.response);
    }
  };

  return (
    <>
      <Header
        title="Recipes "
        subTitle="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div className="container my-2">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-3 d-flex flex-column align-items-center">
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-2 d-flex justify-content-center ">
            <button onClick={navigToAddNew} className="btn btn-success px-4">
              Add new item
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className=" form-control w-100 mt-2"
              placeholder="search by name"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-3">
            <div className="input-group flex-nowrap">
              <select
                className="form-control text-black"
                onChange={getCateValue}
              >
                <option value="">search by category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
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
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item Name</th>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipesList.map((recipe) => (
            <tr key={recipe.id}>
              <th scope="row">{recipe.id}</th>
              <td>{recipe.name}</td>
              <td>
                {recipe.imagePath ? (
                  <img
                    className="img"
                    src={`https://upskilling-egypt.com/${recipe.imagePath}`}
                    alt=""
                  />
                ) : (
                  <img className="img" src={userImg} alt="" />
                )}
              </td>
              <td>{recipe.category[0]?.name}</td>

              <td>
                {
                  loginData?.userGroup=='SuperAdmin'?<div>
                  <i
                  onClick={() => {
                    navigToUpdate(recipe.id);
                  }}
                  className="fa-solid fa-pen-nib px-2 text-warning"
                ></i>
                <i
                  className="fa-solid fa-trash px-2 text-danger"
                  onClick={() => {
                    handleShowDelete();
                    setId(recipe.id);
                  }}
                ></i>
                  </div> : <div>
                  <i
                  className="fa-solid fa-heart px-2 text-danger"
                  onClick={()=>{addToFav(recipe.id)}}
                ></i>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
                getRecipes(page, 5);
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
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteRe handleCloseDelete={handleCloseDelete} id={id} />
        </Modal.Body>
      </Modal>
    </>
  );
}
