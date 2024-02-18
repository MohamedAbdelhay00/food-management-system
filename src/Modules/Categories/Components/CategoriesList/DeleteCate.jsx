import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import deletImg from "../../../../imgs/freepik--Character--inject-70.png";

export default function DeleteCate({ handleCloseDelete, id }) {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting },
  } = useForm();

  let token = localStorage.getItem("adminToken");

  const onSubmit = async () => {
    try {
      let response = await axios
        .delete(`https://upskilling-egypt.com:443/api/v1/Category/${id}`, {
          headers: {
            Authorization: token,
          }
        });
        handleCloseDelete()
        reset()
          setTimeout(() => {
            toast.success("delete success", {position: "top-right"}), 100
          })
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
            <div className="cateField d-flex flex-column align-items-center my-3">
            <img src={deletImg} alt="deleteImg" className="my-4"/>
            <h3>Delete This User ?</h3>
            <p className="text-body-tertiary">are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
              <div className="d-flex justify-content-end">
              <button disabled={isSubmitting} className="btn btn-outline-danger">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Delete This Item'
        )}
              </button>
              </div>
          </form>
  </div>;
}
