"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <>
      <div className="mt-auto ">
        <BiLogOut
          className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-600"
          onClick={() => signOut()}
        />
      </div>
    </>
  );
};

export default LogoutButton;
