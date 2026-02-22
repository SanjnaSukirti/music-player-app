import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __AUTH } from "../backend/FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";

const Register = () => {
  let [togglePassword, setTogglePassword] = useState(false);
  let [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  let navigate = useNavigate();

  let [isLoading, setIsLoading] = useState(false);

  let [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let { username, email, password, confirmPassword } = data;
  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (password !== confirmPassword) {
        toast.error("Confirm Password does not match");
        setData({ ...data, confirmPassword: "" });
      } else {
        let obj = await createUserWithEmailAndPassword(__AUTH, email, password);
        // console.log(obj);
        let { user } = obj;
        // console.log(user);
        await updateProfile(user, {
          displayName: username,
          photoURL:
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        });
        sendEmailVerification(user);
        toast("Verification Link Sent");
        toast.success("User Registered");
        navigate("/auth/login");
      }
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message.slice(10, error.message.length-1)); //can also use slice to get only message
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center">
      <div className="w-[30%] bg-slate-700 p-4 rounded-lg">
        <header>
          <h1 className="text-center text-3xl">Register</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-md">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
                onChange={handleChange}
                name="username"
                value={username}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-md">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
                onChange={handleChange}
                name="email"
                value={email}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-md">
                Password
              </label>
              <input
                type={togglePassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
                onChange={handleChange}
                name="password"
                value={password}
              />
              {togglePassword ? (
                <FaEye
                  className="absolute top-8 right-3 cursor-pointer"
                  onClick={() => {
                    setTogglePassword(!togglePassword);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-8 right-3 cursor-pointer"
                  onClick={() => {
                    setTogglePassword(!togglePassword);
                  }}
                />
              )}
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-md">
                Confirm Password
              </label>
              <input
                type={toggleConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
              />
              {toggleConfirmPassword ? (
                <FaEye
                  className="absolute top-8 right-3 cursor-pointer"
                  onClick={() => {
                    setToggleConfirmPassword(!toggleConfirmPassword);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-8 right-3 cursor-pointer"
                  onClick={() => {
                    setToggleConfirmPassword(!toggleConfirmPassword);
                  }}
                />
              )}
            </div>
            <div>
              <button className="py-2 bg-blue-700 rounded-lg font-semibold w-[100%] mt-2 cursor-pointer hover:bg-blue-800">
                Register
              </button>
            </div>
            <div className="mt-2 text-center">
              <span>Already have an account? </span>
              <NavLink to="/auth/login" className="text-amber-300">
                Login
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Register;
