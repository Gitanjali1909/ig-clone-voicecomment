import Comment from "../models/comment.js";

export const addComment = async (req, res) => {
  const { text } = req.body;

  const comment = await Comment.create({
    user: req.userId,
    reel: req.params.reelId,
    text
  });

  res.status(201).json(comment);
};
 
export const getComments = async (req, res) => {
  const comments = await Comment.find({
    reel: req.params.reelId
  })
    .sort({ createdAt: -1 })
    .populate("user", "username avatar");

  res.json(comments);
};
