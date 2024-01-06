const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();


mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));



// middleware for json()
app.use(express.json());



// user routes
app.use("/api/", require("./routes/user"));
app.use("/api/", require("./routes/ObjectFile"));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

//index.js
/*const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Middleware for parsing JSON in the request body
app.use(express.json());
//app.use(upload.single('file'));

// Multer middleware for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for testing, change as needed
const upload = multer({ storage: storage });

// Routes
app.use("/api/", require("./routes/user"));
app.use("/api/", require("./routes/ObjectFile")(upload));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});*/
