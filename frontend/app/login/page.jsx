"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setError("Invalid email or password");
    } else {
      router.push("/home");
    }
  };
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
              Login
              <span className="text-blue-600"> ChatApp</span>
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-black">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-primary bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-black">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-primary bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link
                href="/signup"
                className="text-sm  hover:text-blue-600 mt-2 inline-block"
              >
                {"Don't"} have an account?
              </Link>
              <div>
                <button className="btn btn-primary btn-block mt-2">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
