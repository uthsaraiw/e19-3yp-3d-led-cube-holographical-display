// models/postFile.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  email: { type: String},
  //fileType: { type: String},
  fileContent: { type: Buffer, required: true },
});

const PostFile = mongoose.model('PostFile', fileSchema);

module.exports = PostFile;
