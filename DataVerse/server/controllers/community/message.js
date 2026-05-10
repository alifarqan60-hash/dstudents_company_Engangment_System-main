import Message from "../../models/community/Message.js";




export const getPreviousMessages = async (req, res, next) => {
    const otherUserId = req.params.userId;
    const currentUserId = req.user.id;
  
    try {
      const messages = await Message.find({
        $or: [
          { senderId: currentUserId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUserId },
        ],
      }).sort({ createdAt: 1 }); 
  
      res.status(200).json(messages);
    } catch (error) {
      next(error)
    }    
}