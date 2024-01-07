//models/objectFile.js
const mongoose = require('mongoose');

const objectFileSchema = new mongoose.Schema({
  email: { type: String}, // Add email field
  //filename: { type: String, required: true },
  fileContent: { type: Buffer, required: true },
});

const ObjectFile = mongoose.model('ObjectFile', objectFileSchema);

module.exports = ObjectFile;


