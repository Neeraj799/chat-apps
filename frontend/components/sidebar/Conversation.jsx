import useConversation from "@/zustand/useConversation";
import React from "react";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-400 rounded p-2 cursor-pointer
          ${isSelected ? "bg-blue-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-600">{conversation.fullName}</p>
          </div>{" "}
        </div>
      </div>

      <div className="divider my-0 py-0 h-1 bg-black"></div>
    </>
  );
};

export default Conversation;
