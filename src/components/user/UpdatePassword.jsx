import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

const UpdatePassword = () => {
  let [toggleCurrentPassword, setToggleCurrentPassword] = useState(false);
  let [toggleNewPassword, setToggleNewPassword] = useState(false);
  let [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let { authUser } = useContext(AuthContextAPI);
  let [data, setData] = useState({
    currentPassword:"",
    newPassword: "",
    confirmPassword: "",
  });
  let { currentPassword,newPassword, confirmPassword } = data;
  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };
  let handleSubmit =async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      setIsLoading(true);
      if(!currentPassword){
        toast.error("Current Password wrong")
      }
      if (newPassword !== confirmPassword) {
        toast.error("Confirm Password does not match");
        setData({ ...data, confirmPassword: "" });
      }
      else{
        const credential=EmailAuthProvider.credential(authUser.email,currentPassword)
        await reauthenticateWithCredential(authUser,credential)
        await updatePassword(authUser,newPassword)
        toast.success("Password updated successfully")
        setData({
          currentPassword:"",
          newPassword: "",
          confirmPassword: "",
        })
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-slate-900 flex items-center justify-center">
      <article className="min-h-[300px] w-[40%] bg-slate-950 rounded-xl p-4">
        <h2 className="text-center text-2xl">Update Password</h2>
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
          <div className="flex flex-col gap-2 w-[100%] relative">
            <label htmlFor="newPassword" className="block text-[18px]">
              New Password
            </label>
            <input
              type={toggleNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter New Password"
              className="outline-none py-2 px-4 rounded-lg  bg-white text-black"
              onChange={handleChange}
              name="newPassword"
              value={newPassword}
            />
            {toggleNewPassword ? (
              <FaEye
                className="absolute top-12 right-3 cursor-pointer text-black"
                onClick={() => {
                  setToggleNewPassword(!toggleNewPassword);
                }}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-12 right-3 cursor-pointer text-black"
                onClick={() => {
                  setToggleNewPassword(!toggleNewPassword);
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 w-[100%] relative">
            <label htmlFor="confirmPassword" className="block text-[18px]">
              Confirm Password
            </label>
            <input
              type={toggleConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm New Password"
              className="outline-none bg-white py-2 px-4 rounded-lg text-black"
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
            />
            {toggleConfirmPassword ? (
              <FaEye
                className="absolute top-12 right-3 cursor-pointer text-black"
                onClick={() => {
                  setToggleConfirmPassword(!toggleConfirmPassword);
                }}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-12 right-3 cursor-pointer text-black"
                onClick={() => {
                  setToggleConfirmPassword(!toggleConfirmPassword);
                }}
              />
            )}
          </div>
          <div>
            <button className="py-2 bg-blue-600 rounded-lg font-semibold text-lg w-[100%] mt-2 cursor-pointer hover:bg-blue-800">
              Submit
            </button>
          </div>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePassword;
