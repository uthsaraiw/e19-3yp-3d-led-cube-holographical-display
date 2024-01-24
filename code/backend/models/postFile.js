
// const mongoose = require('mongoose');

// const fileSchema = new mongoose.Schema({
//   email: { type: String },
//   files: [{
//     fileType: { type: String },
//     fileContent: { type: Buffer, required: true },
//   }],
// });

// const PostFile = mongoose.model('PostFile', fileSchema);

// module.exports = PostFile;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postFileSchema = new Schema({
  email: { type: String, required: true },
  image: { type: Buffer },
  video: { type: Buffer },
  code: { type: Buffer },
  object: { type: Buffer },
});

const PostFile = mongoose.model('PostFile', postFileSchema);

module.exports = PostFile;



