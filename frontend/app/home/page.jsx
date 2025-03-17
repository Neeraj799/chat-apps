import MessageContainer from "@/components/messages/MessageContainer";
import Sidebar from "@/components/sidebar/Sidebar";

import React from "react";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden mt-15 bg-gray-100 justify-between">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
