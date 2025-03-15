import React from "react";
import SearchInput from "./searchInput";
import Conversation from "./conversation";

const Sidebar = () => {
  return (
    <div className="p-10">
      <SearchInput />
      <Conversation />
    </div>
  );
};

export default Sidebar;
