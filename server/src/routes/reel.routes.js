import express from "express";
import upload from "../middleware/auth.middleware.js";
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
router.post(
  "/:reelId",
  protect,
  upload.single("audio"),
  addVoiceNote
);
router.put("/:id/like", protect, likeReel);
router.get("/feed", protect, getReelsFeed);

export default router;
