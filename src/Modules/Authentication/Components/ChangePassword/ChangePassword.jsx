import React from "react";

import "./ChangePassword.css";
import logo from "../../../../imgs/4 4.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

export default function ChangePassword({ handleClose }) {
    let token = localStorage.getItem("adminToken");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async(data) => {
    try {
        let res = await axios.put("https://upskilling-egypt.com:443/api/v1/Users/ChangePassword", data, {
            headers: {
                Authorization: token, 
            }
        })
        handleClose()
        setTimeout(() => {
            toast.success("Password changed successfully", {position: "top-right"}), 100
          })
    } catch (error){
        toast.error(error.response.data.message);
    }
    }

  return (
    <div className="change-password py-3 px-5">
      <div className="d-flex justify-content-center">
        <img src={logo} alt="logo" />
      </div>
      <div>
        <h4>Change Your Password</h4>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text input-icon" id="addon-wrapping">
                <i className="fa-solid fa-key"></i>
              </span>
              <input
                type="password"
                className="form-control input-field"
                placeholder="Old Password"
                aria-label="oldPassword"
                aria-describedby="addon-wrapping"
                {...register("oldPassword", {
                  required: "Old Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@])(?=.{8,20}$)/,
                    message: "Old Password is not valid",
                  },
                })}
              />
            </div>
            <div className="w-100">
              {errors.oldPassword && (
                <span className="alert alert-danger w-100 d-flex">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="my-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text input-icon" id="addon-wrapping">
                <i className="fa-solid fa-key"></i>
              </span>
              <input
                type="password"
                className="form-control input-field"
                placeholder="New Password"
                aria-label="newPassword"
                aria-describedby="addon-wrapping"
                {...register("newPassword", {
                  required: "New Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@])(?=.{8,20}$)/,
                    message: "New Password is not valid",
                  },
                })}
              />
            </div>
            <div className="w-100">
              {errors.newPassword && (
                <span className="alert alert-danger w-100 d-flex">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="my-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text input-icon" id="addon-wrapping">
                <i className="fa-solid fa-key"></i>
              </span>
              <input
                type="password"
                className="form-control input-field"
                placeholder="Confirm New Password"
                aria-label="confirmNewPassword"
                aria-describedby="addon-wrapping"
                {...register("confirmNewPassword", {
                  required: "confirmation is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@])(?=.{8,20}$)/,
                    message: "confirm New Password is not valid",
                  },
                })}
              />
            </div>
            <div className="w-100">
              {errors.confirmNewPassword && (
                <span className="alert alert-danger w-100 d-flex">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
          </div>
          <button disabled={isSubmitting} className="btn btn-success w-100">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Change Password'
        )}
              </button>
        </form>
      </div>
    </div>
  );
}
