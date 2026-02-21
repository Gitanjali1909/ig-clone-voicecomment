import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 🧠 Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    // 🔥 If user does NOT exist → create
    if (!user) {
      user = await User.create({
        username: username || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        password, // hashed in model
      });
    } else {
      // 🔐 If user exists → check password
      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
    }

    // 🎯 Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🚫 Remove password before sending user
    const userData = user.toObject();
    delete userData.password;

    res.json({
      token,
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};
