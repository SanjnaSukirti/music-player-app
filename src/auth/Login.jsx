import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";
import toast from "react-hot-toast";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { __AUTH } from "../backend/FirebaseConfig";
import { AuthContextAPI } from "../context/AuthContext";

const Login = () => {
  let [togglePassword, setTogglePassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let {setAuthUser}=useContext(AuthContextAPI)
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;

  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let obj = await signInWithEmailAndPassword(__AUTH, email, password);
      // console.log(obj);
      let { user } = obj;
      console.log(user);
      if (user.emailVerified === true) {
        toast.success("Login Successful");
        setAuthUser(user)
        navigate("/");
      } else {
        toast.error("Verify your email");
        sendEmailVerification(user);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center">
      <div className="w-[30%] bg-slate-700 p-4 rounded-lg">
        <header>
          <h1 className="text-center text-3xl">Login</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
            <div>
              <button className="py-2 bg-blue-700 rounded-lg font-semibold w-[100%] mt-2 cursor-pointer hover:bg-blue-800">
                Login
              </button>
            </div>
            <div className="mt-2 text-center">
              <span>Don't have an account? </span>
              <NavLink to="/auth/register" className="text-amber-300">
                Register
              </NavLink>
            </div>
            <div className="mt-2 text-center">
              <NavLink to="/auth/forgot-password" className="text-amber-300">
                Forgot Password?
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Login;
