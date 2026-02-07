import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  createReel,
  likeReel,
  getReelsFeed
} from "../controllers/reel.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("video"),
  createReel
);

router.put("/:id/like", protect, likeReel);
router.get("/feed", protect, getReelsFeed);

export default router;
