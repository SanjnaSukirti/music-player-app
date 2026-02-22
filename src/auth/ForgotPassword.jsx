import React, { useState } from "react";
import Spinner from "../helpers/Spinner";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { __AUTH } from "../backend/FirebaseConfig";

const ForgotPassword = () => {
  let [email, setEmail] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(__AUTH, email);
      toast.success("Reset link sent to mail");
      navigate("/auth/login");
    } catch (error) {
      toast.success(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center">
        <div className="w-[30%] bg-slate-700 p-4 rounded-lg">
          <header>
            <h1 className="text-center text-3xl">Reset Password</h1>
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

              <div>
                <button className="py-2 bg-blue-600 rounded-lg font-semibold w-[100%] mt-2 cursor-pointer hover:bg-blue-800">
                  Reset Password
                </button>
              </div>
              <div className="mt-2 text-center">
                <NavLink
                  to="/auth/login"
                  className="text-amber-300 w-[100%] bg-slate-500 block font-semibold cursor-pointer rounded-lg py-2 hover:bg-slate-800"
                >
                  Cancel
                </NavLink>
              </div>
            </form>
          </main>
        </div>
        {isLoading && <Spinner />}
      </section>
    </div>
  );
};

export default ForgotPassword;
