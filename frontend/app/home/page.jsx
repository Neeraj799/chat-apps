import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden mt-10">
      <Sidebar />
    </div>
  );
};

export default Home;
