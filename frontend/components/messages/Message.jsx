import useConversation from "@/zustand/useConversation";
import { useSession } from "next-auth/react";
import React from "react";

const Message = ({ message }) => {
  const { data: session } = useSession();

  const { selectedConversation } = useConversation();

  if (!session?.user) return null;
  const fromMe = message.senderId === session.user.id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? session?.user?.profilePic
    : selectedConversation?.profilePic;

  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const formattedDate = message.created_at
    ? new Date(message.created_at).toLocaleString()
    : "Unknown date";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-avatar">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${bubbleBgColor}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedDate}
      </div>
    </div>
  );
};

export default Message;
