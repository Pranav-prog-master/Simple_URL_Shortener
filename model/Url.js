const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: [true, "Short code is required"],
    unique: true,
    trim: true,
    minlength: [3, "Short code must be at least 3 characters"],
    maxlength: [20, "Short code cannot exceed 20 characters"],
  },
  originalUrl: {
    type: String,
    required: [true, "Original URL is required"],
    trim: true,
    match: [
      /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/[\w\-.~:/?#[\]@!$&'()*+,;=%]*)?$/,
      "Please provide a valid URL starting with http:// or https://",
    ],
    maxlength: [2048, "URL cannot exceed 2048 characters"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Url", urlSchema);
