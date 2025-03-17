"use client";
import Link from "next/link";
import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import { toast } from "react-toastify";

const page = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleGenderChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    toast.success("Signup successfully");
  };

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Signup
            <span className="text-blue-600"> ChatApp</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-black">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-primary bg-white"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-black">
                  User Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-primary bg-white"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-black">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-primary bg-white"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-black">
                  Password
                </span>
              </label>
              <input
                type="text"
                placeholder="Password"
                className="input input-primary bg-white"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-black">
                  Confirm Password
                </span>
              </label>
              <input
                type="text"
                placeholder="Confirm password"
                className="input input-primary bg-white"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>

            <div className="flex mt-2">
              <div className="form-control">
                <label
                  className={`label gap-2 cursor-pointer ${
                    inputs.gender === "male" ? "selected" : ""
                  }`}
                >
                  <span className="label-text">Male</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={inputs.gender === "male"}
                    onChange={() => handleGenderChange("male")}
                  />
                </label>
              </div>
              <div className="form-control ml-2">
                <label
                  className={`label gap-2 cursor-pointer ${
                    inputs.gender === "female" ? "selected" : ""
                  }`}
                >
                  <span className="label-text">Female</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={inputs.gender === "female"}
                    onChange={() => handleGenderChange("female")}
                  />
                </label>
              </div>
            </div>

            <Link
              href="/login"
              className="text-sm  hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>
            <div>
              <button className="btn btn-primary btn-block mt-2">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
