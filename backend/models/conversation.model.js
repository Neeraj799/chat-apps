import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
