
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





