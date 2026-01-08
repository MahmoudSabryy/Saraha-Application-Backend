import mongoose, { Schema, Types } from "mongoose";
export const messageSchema = new Schema(
  {
    //body
    content: {
      type: String,
      required: true,
    },
    //sender
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    //receiver
    receiver: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
