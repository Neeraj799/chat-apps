import React from "react";
import Message from "./Message";
import useGetMessages from "@/app/hooks/useGetMessages";
import MessageSkeleton from "../MessageSkeleton/page";
import useListenMessages from "@/app/hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        {loading && <MessageSkeleton />}
        {!loading && messages.length === 0 && (
          <p className="text-center">
            Send a message to start the conversation
          </p>
        )}
      </div>
    </>
  );
};

export default Messages;
