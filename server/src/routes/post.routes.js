import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", protect, createPost);
router.put("/:id/like", protect, likePost);

export default router;
