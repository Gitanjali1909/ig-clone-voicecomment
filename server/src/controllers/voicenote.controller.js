import VoiceNote from "../models/voicenote.js";

export const addVoiceNote = async (req, res) => {
  const { audioUrl, duration } = req.body;

  const voice = await VoiceNote.create({
    user: req.userId,
    reel: req.params.reelId,
    audioUrl,
    duration
  });

  res.status(201).json(voice);
};

export const getVoiceNotes = async (req, res) => {
  const voices = await VoiceNote.find({
    reel: req.params.reelId
  })
    .sort({ createdAt: -1 })
    .populate("user", "username avatar");

  res.json(voices);
};
