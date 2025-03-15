import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.userId;
    console.log("data", req.user.userId);

    let conversation = await Conversation.findOne({
      participients: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participients: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    //Socket.io functionality goes here

    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.userId;

    const conversation = await Conversation.findOne({
      participients: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const message = conversation.message;

    return res.status(200).json(message);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { sendMessage, getMessages };
