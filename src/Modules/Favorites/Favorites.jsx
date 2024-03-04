import React, { useEffect, useState } from "react";
import Header from "../Shared/Components/Header/Header";

import noData from "../../imgs/freepik--Character--inject-70.png";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      let token = localStorage.getItem("adminToken");
      let req = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(req.data.data);
      setFavorites(req.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFav = async (id) => {
    try {
      let token = localStorage.getItem("adminToken");
      let req = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('DELETE request response:', req);
      let newFavorites = favorites.filter(item => item.id !== id);
      console.log('New favorites list:', newFavorites);
      setFavorites(newFavorites);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites">
      <Header
        title="Favorite "
        subTitle="Items!"
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="row p-4">
        {favorites?.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="col-md-4">
              <div className="item">
                <img
                  src={`https://upskilling-egypt.com/${fav.recipe.imagePath}`}
                  className="w-100"
                  alt="recipe img"
                />
                <div className="d-flex justify-content-between align-content-center my-3">
                  <div>
                    <h3>{fav.recipe?.name}</h3>
                    <p>{fav.recipe?.description}</p>
                  </div>
                  <div>
                    <i onClick={()=>{deleteFav(fav?.id)}} className="fa-solid fa-trash text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex flex-column justify-content-center">
            <img src={noData} className="w-25" alt="No Data" />
            <h4>No Data !</h4>
            <p className=" text-body-tertiary">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
