"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Signout = () => {
  const { data: session } = useSession();

  if (!session) return <p>Not signed in</p>;
  return (
    <div>
      <div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Signout;
