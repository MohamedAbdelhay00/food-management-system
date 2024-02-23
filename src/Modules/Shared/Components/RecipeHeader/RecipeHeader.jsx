import React from "react";

import './RecipeHeader.css'
import { useNavigate } from "react-router-dom";

export default function RecipeHeader() {
    let nevg = useNavigate()
    const navToRecipes = () => {
        nevg('/dashboard/recipes')
    }
  return (
    <div className="container-fluid rHeader my-3 p-4 rounded-4">
      <div className="row justify-content-between align-items-center ">
        <div className="col-md-6">
          <h4>Fill the Recipes !</h4>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div className="col-md-3">
            <div className="d-flex justify-content-end">
                <button onClick={navToRecipes} className="btn btn-success px-5">Fill Recipes</button>
            </div>
        </div>
      </div>
    </div>
  );
}
