import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createReel,
  likeReel,
  getReelsFeed
} from "../controllers/reel.controller.js";

const router = express.Router();

router.post("/", protect, createReel);
router.put("/:id/like", protect, likeReel);
router.get("/feed", protect, getReelsFeed);

export default router;
