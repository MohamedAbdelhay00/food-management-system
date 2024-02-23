import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Components/Header/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import userImg from '../../../../imgs/freepik--Character--inject-70.png';
import DeleteRe from './DeleteRe';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const getRecipes = async () => {
    let token = localStorage.getItem('adminToken');
    try {
      let response = await axios.get(
        'https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setRecipesList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigToAddNew = () => {
    navigate('/dashboard/recipes-data');
  };

  const navigToUpdate = (id) => {
    navigate(`/dashboard/update/${id}`);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Header
        title="Recipes "
        subTitle="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div className="container my-2">
        <div className="row justify-content-between align-items-center">
          <div className="col-md 4">
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end ">
            <button onClick={navigToAddNew} className="btn btn-success px-4">
              Add new item
            </button>
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
                  <img className="img" src={`https://upskilling-egypt.com/${recipe.imagePath}`} alt="" />
                ) : (
                  <img className="img" src={userImg} alt="" />
                )}
              </td>
              <td>{recipe.category[0]?.name}</td>

              <td>
                <i onClick={() => {navigToUpdate(recipe.id)}} className="fa-solid fa-pen-nib px-2 text-warning"></i>
                <i
                  className="fa-solid fa-trash px-2 text-danger"
                  onClick={() => {
                    handleShowDelete();
                    setId(recipe.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
