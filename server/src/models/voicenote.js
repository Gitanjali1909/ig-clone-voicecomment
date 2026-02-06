import mongoose from "mongoose";

const voiceNoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
      required: true
    },
    audioUrl: {
      type: String,
      required: true
    },
    duration: Number
  },
  { timestamps: true }
);

export default mongoose.model("VoiceNote", voiceNoteSchema);
