import Connection from "../../models/community/Connection.js";
import User from "../../models/User.js";

  export const sendFriendRequest = async (req, res, next) => {
    const { receiverId } = req.params;
    const senderId = req.user.id; 
  
    try {
      const existingRequest = await Connection.findOne({
        sender: senderId,
        receiver: receiverId,
      });
  
      if (existingRequest) {
        return res.status(400).json({ message: "Friend request already sent." });
      }
  
      const connection = new Connection({
        sender: senderId,
        receiver: receiverId,
      });
  
      await connection.save();
      res.status(201).json({ message: "Friend request sent." });
    } catch (err) {
      next(err);
    }
  };


  export const acceptFriendRequest = async (req, res, next) => {
    const { requestId } = req.params;
  
    try {
      const connection = await Connection.findById(requestId);
  
      if (!connection || connection.status !== "pending") {
        return res.status(404).json({ message: "Friend request not found." });
      }
  
      connection.status = "accepted";
      await connection.save();
  
      await User.findByIdAndUpdate(connection.sender, {
        $addToSet: { friends: connection.receiver },
      });
  
      await User.findByIdAndUpdate(connection.receiver, {
        $addToSet: { friends: connection.sender },
      });
  
      res.status(200).json({ message: "Friend request accepted." });
    } catch (err) {
      next(err);
    }
  };
  
  export const rejectFriendRequest = async (req, res, next) => {
    const { requestId } = req.params;
  
    try {
      const connection = await Connection.findByIdAndDelete(requestId);
  
      if (!connection ) {
        return res.status(404).json({ message: "Friend request not found." });
      }
  
  
      res.status(200).json({ message: "Friend request rejected." });
    } catch (err) {
      next(err);
    }
  };

  export const getFriendRequests = async (req, res, next) => {
    const userId = req.user.id;
  
    try {
      const requests = await Connection.find({
        receiver: userId,
        status: "pending",
      }).populate("sender", "username imgUrl");
  
      res.status(200).json(requests);
    } catch (err) {
      next(err);
    }
  };

  export const getAllCommunityUsers = async (req, res, next) => {
    const userId = req.user.id;
  
    try {
      const sentRequests = await Connection.find({ sender: userId }).distinct("receiver");
      const receivedRequests = await Connection.find({ receiver: userId }).distinct("sender");
  
      const excludeIds = [
        ...new Set([
          ...sentRequests,
          ...receivedRequests,
          ...(await User.findById(userId).select("friends -_id")).friends,
        ]),
        userId, 
      ];
  
  
      const users = await User.find({ _id: { $nin: excludeIds } }).select("username imgUrl title");
  
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };
  

  export const getAllFriends = async (req, res, next) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId).select("friends").populate("friends", "username imgUrl");
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json(user.friends);
    } catch (err) {
      next(err);
    }
  };
  