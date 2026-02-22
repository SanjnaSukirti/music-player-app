import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import Spinner from "../../helpers/Spinner";
import { useNavigate } from "react-router-dom";
import { __DB } from "../../backend/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

const DeleteAccount = () => {
  let [isLoading, setIsLoading] = useState(false);
  let { authUser } = useContext(AuthContextAPI);
  let [currentPassword, setCurrentPassword] = useState("");
  let [toggleCurrentPassword, setToggleCurrentPassword] = useState(false);
  let navigate = useNavigate();

  let handleChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!authUser) {
        toast.error("User not authenticated");
      } else {
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        let user_collection=doc(__DB,"user_profile",authUser?.uid)
        await deleteUser(user);
        await deleteDoc(user_collection)
        toast.success("User Account Deleted");
        navigate("/auth/register");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid Password. Please try again");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-slate-900 flex items-center justify-center">
      <article className="min-h-[250px] w-[40%] bg-slate-950 rounded-xl p-4">
        <h2 className="text-center text-2xl">Delete Account</h2>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 w-[100%] relative">
            <label htmlFor="currentPassword" className="block text-[18px]">
              Current Password
            </label>
            <input
              type={toggleCurrentPassword ? "text" : "password"}
              id="currentPassword"
              placeholder="Enter Current Password"
              className="outline-none py-2 px-4 rounded-lg  bg-white text-black"
              onChange={handleChange}
              name="currentPassword"
              value={currentPassword}
            />
            {toggleCurrentPassword ? (
              <FaEye
                className="absolute top-12 right-3 cursor-pointer text-black"
                onClick={() => {
                  setToggleCurrentPassword(!toggleCurrentPassword);
                }}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-12 right-3 cursor-pointer text-black"
                onClick={() => {
                  setToggleCurrentPassword(!toggleCurrentPassword);
                }}
              />
            )}
          </div>

          <button className="py-2 bg-red-500 rounded-lg font-semibold text-lg w-[100%] mt-2 cursor-pointer hover:bg-red-700">
            Delete Account
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default DeleteAccount;
