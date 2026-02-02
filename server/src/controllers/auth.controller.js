import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    await User.create({
      username,
      email,
      password // 👈 plain password, model will hash it
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};
