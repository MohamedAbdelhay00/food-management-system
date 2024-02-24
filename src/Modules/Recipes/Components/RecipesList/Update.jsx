import React, { useEffect, useState } from "react";
import RecipeHeader from "../../../Shared/Components/RecipeHeader/RecipeHeader";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Update() {
    const [categories, setCategorites] = useState([]);
    const [tags, setTags] = useState([]);

    const [recipeId, setRecipeId] = useState();

    let {id} = useParams();

    let navg= useNavigate();
  
    const {
      register,
      handleSubmit,
      setValue, 
      formState: { errors, isSubmitting },
    } = useForm();
  
    const appendToFormData = (data) => {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("tagId", data.tagId);
      formData.append("categoriesIds", data.categoriesIds); // Corrected typo
      formData.append("recipeImage", data.recipeImage[0]); // Corrected key name
      return formData;
    };
    
    const onSubmit = async (data) => {
      let recipesDataForm = appendToFormData(data);
      let token = localStorage.getItem("adminToken");
      try {
        await axios.put(
          `https://upskilling-egypt.com:443/api/v1/Recipe/${id}`,
          recipesDataForm,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data", // Ensure proper content type for FormData
            },
          }
        );
        navg('/dashboard/recipes')
        toast.success("Recipe added successfully", { position: "bottom-left" });
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    
    const getRecipeById = async() => {
        let token = localStorage.getItem("adminToken")
      try {
        let recipe = await axios.get(
          `https://upskilling-egypt.com:443/api/v1/Recipe/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setRecipeId(recipe.data);
      } catch (error) {
        console.log(error);
      }
    }

    const getCategoriesData = async () => {
      let token = localStorage.getItem("adminToken")
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
      let token = localStorage.getItem("adminToken")
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
        if (recipeId) {
            setValue("name", recipeId.name);
            setValue("categoriesId", recipeId.categoriesId);
            setValue("tagsId", recipeId.tagsId);
            setValue("price", recipeId.price);
            setValue("recipeImage", `https://upskilling-egypt.com/${recipeId.imagePath}`);
            setValue("description", recipeId.description);
        }
    }, [recipeId]);
  
    useEffect(() => {
        getCategoriesData();
        getTagsData();
        getRecipeById();
      }, []);
  return (
    <>
    <RecipeHeader />
    <div className="addNew">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3">
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your name"
              aria-label="name"
              aria-describedby="addon-wrapping"
              {...register("name", {
                required: "name is required",
              })}
              
            />
          </div>
          <div className="w-100">
            {errors.name && (
              <span className="alert alert-danger w-100 d-flex">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3">
          <div className="input-group flex-nowrap">
            <select className="form-control text-black"
              {...register("categoriesIds", {
                required: "categoriesIds is required",
              })}
            >
              {categories?.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div className="w-100">
            {errors.categoriesIds && (
              <span className="alert alert-danger w-100 d-flex">
                {errors.categoriesIds.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3">
          <div className="input-group flex-nowrap">
            <select className="form-control text-black"
              {...register("tagId", {
                required: "tagId is required",
              })}
            >
              {tags?.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
            </select>
          </div>
          <div className="w-100">
            {errors.tagId && (
              <span className="alert alert-danger w-100 d-flex">
                {errors.tagId.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3">
          <div className="input-group flex-nowrap">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Your price"
              aria-label="price"
              aria-describedby="addon-wrapping"
              {...register("price", {
                required: "price is required",
              })}
            />
          </div>
          <div className="w-100">
            {errors.price && (
              <span className="alert alert-danger w-100 d-flex">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3">
          <div className="input-group flex-nowrap">
            <input
              type="file"
              className="form-control"
              {...register("recipeImage", {
                required: "recipeImage is required",
              })}
            />
          </div>
          <div className="w-100">
            {errors.recipeImage && (
              <span className="alert alert-danger w-100 d-flex">
                {errors.recipeImage.message}
              </span>
            )}
          </div>
        </div>
        <div className="my-3">
          <div className="input-group flex-nowrap">
            <textarea
              className="form-control"
              placeholder="Enter Your description"
              {...register("description", {
                required: "description is required",
              })}
            ></textarea>
          </div>
          <div className="w-100">
            {errors.description && (
              <span className="alert alert-danger w-100 d-flex">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button disabled={isSubmitting} className="btn btn-success w-100">
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  </>
  )
}
