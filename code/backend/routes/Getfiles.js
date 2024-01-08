// routes/Getfiles.js
const express = require("express");
const ObjectFile = require("../models/objectFile");
const validator = require("validator");

//const numpy = require('numpy');
//const np = numpy.load;

//const npyjs = require('npyjs');

const router = express.Router();

// Route to get the .obj file content by email
router.get("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;

    console.log(email);

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Find the .obj file by email
    const objectFile = await ObjectFile.findOne({ email });

    if (!objectFile) {
      return res
        .status(404)
        .json({ error: ".npy File not found for the specified email" });
    }

    // Convert the buffer data back to its original form
    const fileBuffer = objectFile.fileContent;

    console.log(fileBuffer.toString());
    const hexData = fileBuffer.toString();
    //const npyData = np(fileBuffer);
    //const fileType = 'application/octet-stream';
    //const fileType = 'text/plain';

    // Send the .obj file content in the response

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${email}.hex"`);
    res.send(hexData);
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware
  }
});

module.exports = router;
