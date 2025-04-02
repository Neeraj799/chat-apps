"use client";
import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "@/app/hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("Conversation", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length > 0
        ? conversations?.map((conversation) => (
            <Conversation key={conversation._id} conversation={conversation} />
          ))
        : !loading && (
            <p className="text-center text-gray-500">No conversations found</p>
          )}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
