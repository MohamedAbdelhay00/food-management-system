import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import logo from "../../../../imgs/4 4.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Login({ saveAdminData }) {
  let navg = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios
        .post("https://upskilling-egypt.com:443/api/v1/Users/Login", data);
          localStorage.setItem("adminToken", response.data.token);
          saveAdminData();
          navg("/dashboard");
          setTimeout(() => {
            toast.success("login success", {position: "top-right"}), 100
          })
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="auth-container w-100 vh-100 d-flex justify-content-center align-items-center ">
      <ToastContainer></ToastContainer>
      <div className=" container d-flex justify-content-center align-items-center ">
        <div className="bg-white col-md-6 col-sm-12 rounded-2 p-5">
          <div className="text-center">
            <img src={logo} alt="logo" className="w-50" />
          </div>
          <div>
            <h2>Log In</h2>
            <p className="text-secondary">
              Welcome Back! Please enter your details
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Email"
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
            <div className="my-3">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  aria-label="password"
                  aria-describedby="addon-wrapping"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@])(?=.{8,20}$)/,
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
            <div className="d-flex justify-content-between">
              <a>Register Now?</a>
              <Link to='/forgot-password' className="text-success">forgot password?</Link>
            </div>
            <div className="mt-4">
              <button disabled={isSubmitting} className="btn btn-success w-100">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Login'
        )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
