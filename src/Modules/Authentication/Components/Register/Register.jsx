import React from "react";
import "./Register.css";
import { set, useForm } from "react-hook-form";
import logo from "../../../../imgs/4 4.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Register({ saveAdminData }) {
  let navg = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };

  const onSubmit = async (data) => {
    let registerFormData = appendToFormData(data);

    try {
      let req = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        registerFormData
      );
      console.log(req);
      setTimeout(() => {
        toast.success("Register Successfully");
      });
      navg("/verify-account");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="auth-container w-100 vh-100 d-flex justify-content-center align-items-center ">
      <ToastContainer></ToastContainer>
      <div className=" container d-flex justify-content-center align-items-center ">
        <div className="bg-white col-md-6 col-sm-12 rounded-2 p-5 w-75">
          <div className="text-center">
            <img src={logo} alt="logo" className="w-25" />
          </div>
          <div className=" fs-6 ">
            <h2>Register</h2>
            <p className="text-secondary">Welcome! Please enter your details</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <span
                        className="input-group-text input-icon"
                        id="addon-wrapping"
                      >
                        <i className="fa-regular fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control input-field"
                        placeholder="User Name"
                        aria-label="userName"
                        aria-describedby="addon-wrapping"
                        {...register("userName", {
                          required: "userName is required",
                        })}
                      />
                    </div>
                    <div className="w-100">
                      {errors.userName && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.userName.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <span
                        className="input-group-text input-icon"
                        id="addon-wrapping"
                      >
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control input-field"
                        placeholder="Enter Your E-mail"
                        aria-label="email"
                        aria-describedby="addon-wrapping"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Email not valid",
                          },
                        })}
                      />
                    </div>
                    <div className="w-100">
                      {errors.email && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <span
                        className="input-group-text input-icon"
                        id="addon-wrapping"
                      >
                        <i className="fa-solid fa-earth-africa"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control input-field"
                        placeholder="Country"
                        aria-label="country"
                        aria-describedby="addon-wrapping"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                    </div>
                    <div className="w-100">
                      {errors.country && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.country.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <span
                        className="input-group-text input-icon"
                        id="addon-wrapping"
                      >
                        <i className="fa-solid fa-mobile-screen-button"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control input-field"
                        placeholder="Phone Number"
                        aria-label="phoneNumber"
                        aria-describedby="addon-wrapping"
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
                          pattern: {
                            value: /^(010|011|012|015)\d{8}$/,
                            message: "phone not valid",
                          },
                        })}
                      />
                    </div>
                    <div className="w-100">
                      {errors.phoneNumber && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.phoneNumber.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <span
                        className="input-group-text input-icon"
                        id="addon-wrapping"
                      >
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control input-field"
                        placeholder="Password"
                        aria-label="password"
                        aria-describedby="addon-wrapping"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@])(?=.{8,20}$)/,
                            message: "Password is not valid",
                          },
                        })}
                      />
                    </div>
                    <div className="w-100">
                      {errors.password && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <span
                        className="input-group-text input-icon"
                        id="addon-wrapping"
                      >
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control input-field"
                        placeholder="Conmfirm-Password"
                        aria-label="confirmPassword"
                        aria-describedby="addon-wrapping"
                        {...register("confirmPassword", {
                          required: "confirm-Password is required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@])(?=.{8,20}$)/,
                            message: "Password is not valid",
                          },
                        })}
                      />
                    </div>
                    <div className="w-100">
                      {errors.confirmPassword && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="my-3">
                    <div className="input-group flex-nowrap">
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Profile Image"
                        aria-label="profileImage"
                        aria-describedby="addon-wrapping"
                        {...register("profileImage")}
                      />
                    </div>
                    <div className="w-100">
                      {errors.profileImage && (
                        <span className="alert alert-danger w-100 d-flex">
                          {errors.profileImage.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p
                  onClick={() => {
                    navg("/login");
                  }}
                >
                  have an account?{" "}
                  <span className=" text-success">Login now!</span>
                </p>
              </div>
              <div className="mt-4">
                <button
                  disabled={isSubmitting}
                  className="btn btn-success w-100"
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
