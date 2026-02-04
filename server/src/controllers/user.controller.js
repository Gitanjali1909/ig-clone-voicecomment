import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { bio, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    { bio, avatar },
    { new: true }
  ).select("-password");

  res.json(user);
};
