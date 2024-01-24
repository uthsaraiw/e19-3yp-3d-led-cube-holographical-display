/*const router = require('express').Router();
const PostFile = require('../models/postFile');

router.get('/getfiles/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const files = await PostFile.find({ email: userEmail });

    if (!files || files.length === 0) {
      return res.status(404).send('No files found for the specified email');
    }

    // Assuming you want to send an array of file objects
    // res.send(files);

    // If you want to send a single file, you need to choose one from the array
    const fileToSend = files[0];

    // Set the appropriate content type based on the stored contentType
    res.set('Content-Type', fileToSend.contentType || 'application/octet-stream');
    res.send(fileToSend.fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;*/

const router = require('express').Router();
const PostFile = require('../models/postFile');

router.get('/getfiles/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const postFiles = await PostFile.find({ email: userEmail });

    if (!postFiles || postFiles.length === 0) {
      return res.status(404).send('No files found for the specified email');
    }

    // Assuming you want to send an array of postFile objects
    res.send(postFiles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;





