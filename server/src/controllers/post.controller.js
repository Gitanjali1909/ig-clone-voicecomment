import Post from "../models/post.js";

export const createPost = async (req, res) => {
  const { caption, mediaUrl, mediaType } = req.body;

  const post = await Post.create({
    user: req.userId,
    caption,
    mediaUrl,
    mediaType
  });

  res.status(201).json(post);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.userId)) {
    post.likes.push(req.userId);
    await post.save();
  }

  res.json({ likes: post.likes.length });
};
