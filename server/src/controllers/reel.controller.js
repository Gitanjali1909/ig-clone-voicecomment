import Reel from "../models/reels.js";

export const createReel = async (req, res) => {
  const { videoUrl, caption } = req.body;

  const reel = await Reel.create({
    user: req.userId,
    videoUrl,
    caption
  });

  res.status(201).json(reel);
};

export const likeReel = async (req, res) => {
  const reel = await Reel.findById(req.params.id);

  if (!reel) {
    return res.status(404).json({ message: "Reel not found" });
  }

  const liked = reel.likes.includes(req.userId);

  if (liked) {
    reel.likes = reel.likes.filter(
      (id) => id.toString() !== req.userId
    );
  } else {
    reel.likes.push(req.userId);
  }

  await reel.save();
  res.json({ likes: reel.likes.length });
};

export const getReelsFeed = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reels = await Reel.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "username avatar");

  res.json(reels);
};
