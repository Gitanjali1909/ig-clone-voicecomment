import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;
