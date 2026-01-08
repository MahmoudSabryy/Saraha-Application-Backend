import messageModel from "../../DB/Models/message.model.js";
import UserModel from "../../DB/Models/user.model.js";
import { flags } from "./message.validation.js";
export const sendMessage = async (req, res, next) => {
  const { content, receiver } = req.body;
  const user = await UserModel.findById(receiver);
  if (!user) return next(new Error("User Not Found", { cause: 404 }));
  const message = await messageModel.create({
    content,
    receiver,
    sender: req.user._id,
  });
  return res.status(200).json({
    success: true,
    message: "Message Sent Successfully",
    results: message,
  });
};
export const getSingleMessage = async (req, res, next) => {
  const { messageid } = req.params;
  const message = await messageModel
    .findById(messageid)
    .select("-_id")
    .populate({
      path: "sender receiver",
      select: "email userName -_id",
    });
  if (
    message.sender.email == req.user.email ||
    message.receiver.email == req.user.email
  ) {
    return res.status(200).json({ success: false, results: message });
  }
  return next(new Error("you are not allowed ", { cause: 401 }));
};
export const getAllMessages = async (req, res, next) => {
  const { flag } = req.query;
  if (flag == flags.inbox) {
    const allMessages = await messageModel.find({ receiver: req.user._id });
    return res.status(200).json({ success: true, results: allMessages });
  }
  const allMessages = await messageModel.find({ sender: req.user._id });
  return res.status(200).json({ success: true, results: allMessages });
};
export const updateMessage = async (req, res, next) => {
  const { messageid } = req.params;
  const message = await messageModel
    .findById(messageid)
    .select("-_id")
    .populate({
      path: "sender receiver",
      select: "userName email -_id",
    });
  if (!message) return next(new Error("Message Not Found", { cause: 404 }));

  if (message.sender.email == req.user.email) {
    const updatedmessage = await messageModel.updateOne(
      { _id: messageid },
      {
        $set: { content: req.body.content },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "message updated Successfully",
      message,
    });
  }
  return next(new Error("you are not allowed to update this message"));
};
export const deleteMessage = async (req, res, next) => {
  const { messageid } = req.params;
  const message = await messageModel
    .findById(messageid)
    .select("-_id")
    .populate({ path: "sender receiver", select: "userName email -_id" });
  if (!message) return next(new Error("Message Not Found", { cause: 404 }));
  if (message.sender.email == req.user.email) {
    const deletedmessage = await messageModel.deleteOne({ _id: messageid });
    if (deletedmessage.acknowledged == true) {
      return res.status(200).json({
        success: true,
        message: `${req.user.userName} message deleted successfully`,
      });
    }
  }
  return next(
    new Error(`${req.user.userName} you are not allowed to delete this message`)
  );
};
