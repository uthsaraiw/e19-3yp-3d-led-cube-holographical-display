
const router = require('express').Router();
const PostFile = require('../models/postFile');

router.get('/getfiles/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const postFile = await PostFile.findOne({ email: userEmail });

    if (!postFile || !postFile.files || postFile.files.length === 0) {
      return res.status(404).send('No files found for the specified email');
    }

    
    // Set the appropriate content type based on the stored contentType
    res.set('Content-Type', postFile.files[0].contentType || 'application/octet-stream');

    // Send all files in the array
    for (const file of postFile.files) {
      // Send the file content
      res.write(file.fileContent);
    }

    res.end(); // End the response after sending all files
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;



