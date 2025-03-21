import useSendMessage from "@/app/hooks/useSendMessage";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? (
              <span className="loading loading-spinner mx-auto"></span>
            ) : (
              <BsSend color="white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
