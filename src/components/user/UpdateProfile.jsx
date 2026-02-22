import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";
import { UserContextAPI } from "../../context/UserContext";

const UpdateProfile = () => {
  let { authUser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);
  let [data, setData] = useState({
    phoneNo: userProfile?.phoneNumber,
    dob: userProfile?.dateOfBirth,
    languages: userProfile?.languages,
    gender: userProfile?.gender,
    address: userProfile?.address
  });
  let { phoneNo, dob, languages, gender, address } = data;
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    let { displayName, email, photoURL, uid } = authUser;
    let payload = {
      name: displayName,
      email: email,
      photo: photoURL,
      id: uid,
      phoneNumber: phoneNo,
      dateOfBirth: dob,
      gender: gender,
      languages: languages,
      address: address,
      role: "user",
    };

    try {
      setIsLoading(true);
      console.log(payload);
      let user_collection = doc(__DB, "user_profile", uid);
      await setDoc(user_collection, payload);
      toast.success("Details Added");
      navigate("/user-profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[100%] w-[100%] bg-slate-900 flex items-center justify-center">
      <article className="min-h-[300px] w-[60%] bg-slate-950 rounded-xl p-4">
        <h2 className="text-center text-2xl">Upload Profile Data</h2>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <article className="flex gap-5">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="phoneNo" className="block text-[18px]">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNo"
                placeholder="Enter Phone Number"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="phoneNo"
                value={phoneNo}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="dob" className="block text-[18px]">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                placeholder="Enter Date of Birth"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                value={dob}
                name="dob"
              />
            </div>
          </article>
          <article className="flex gap-5">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="languages" className="block text-[18px]">
                Languages
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter Languages"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                value={languages}
                name="languages"
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="gender" className="block text-[18px]">
                Gender
              </label>
              <div className="flex gap-2 text-lg font-semibold justify-center">
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  onChange={handleChange}
                  className="accent-amber-300"
                  checked={gender==="Male"}
                />
                <span>Male</span>

                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  onChange={handleChange}
                  className="accent-amber-300"
                  checked={gender==="Female"}
                />
                <span>Female</span>

                <input
                  type="radio"
                  value="Others"
                  name="gender"
                  onChange={handleChange}
                  className="accent-amber-300"
                  checked={gender==="Others"}
                />
                <span>Others</span>
              </div>
            </div>
          </article>
          <article className="flex flex-col gap-2">
            <label htmlFor="address" className="block text-[18px]">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              placeholder="Enter Address"
              className="w-[100%] outline-none bg-white py-2 px-4 rounded-lg text-black"
              onChange={handleChange}
              value={address}
            ></textarea>
          </article>
          <article>
            <button className="py-2 bg-blue-600 rounded-lg font-semibold text-lg w-[100%] mt-2 cursor-pointer hover:bg-blue-800">
              Submit
            </button>
          </article>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdateProfile;
