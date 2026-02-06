import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isAudio = file.mimetype.startsWith("audio");
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: isAudio ? "voice-notes" : "reels",
      resource_type: isAudio ? "video" : "video"
    };
  }
});

const upload = multer({ storage });

export default upload;
