import React from "react";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";

const Sidebar = () => {
  return (
    <div className="w-1/4 p-4 border-r border-slate-500 flex flex-col">
      <SearchInput />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
