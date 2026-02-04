import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import errorHandler from "./middleware/errormiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import reelRoutes from "./routes/reel.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ ROUTES FIRST
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reels", reelRoutes);
// ✅ ERROR HANDLER LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
