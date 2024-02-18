import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UpdateCate({ handleCloseUpdate, id }) {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting },
  } = useForm();

  let token = localStorage.getItem("adminToken");

  const onSubmit = async (data) => {
    try {
      let response = await axios
        .put(`https://upskilling-egypt.com:443/api/v1/Category/${id}`, data, {
          headers: {
            Authorization: token,
          }
        });
        handleCloseUpdate()
        reset()
          setTimeout(() => {
            toast.success("update success", {position: "top-right"}), 100
          })
    } catch (err) {
      console.log(err);
    }
  };

  return <div>
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
              <div className="d-flex justify-content-end">
              <button disabled={isSubmitting} className="btn btn-success w-100">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Save'
        )}
              </button>
              </div>
          </form>
  </div>;
}
