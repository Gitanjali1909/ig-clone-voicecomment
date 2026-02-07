import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  addVoiceNote,
  getVoiceNotes
} from "../controllers/voicenote.controller.js";

const router = express.Router();

router.post(
  "/:reelId",
  protect,
  upload.single("audio"),
  addVoiceNote
);
router.get("/:reelId", protect, getVoiceNotes);

export default router;
