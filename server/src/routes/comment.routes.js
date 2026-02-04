import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  addComment,
  getComments
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:reelId", protect, addComment);
router.get("/:reelId", protect, getComments);

export default router;
