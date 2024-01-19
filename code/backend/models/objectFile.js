//models/objectFile.js
const mongoose = require("mongoose");

const objectFileSchema = new mongoose.Schema({
  email: { type: String }, // Add email field
  //filename: { type: String, required: true },
  fileContent: { type: Buffer, required: true },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const ObjectFile = mongoose.model("ObjectFile", objectFileSchema);

module.exports = ObjectFile;
