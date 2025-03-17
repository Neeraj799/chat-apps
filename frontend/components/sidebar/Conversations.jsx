"use client";
import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "@/app/hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("Conversation", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
