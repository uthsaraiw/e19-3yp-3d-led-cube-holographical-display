// index.js

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// middleware for json()
app.use(express.json());
app.use(cors());
//app.use(upload.single('file'));

// user routes
app.use("/api/", require("./routes/user"));
//app.use("/api/", require("./routes/ObjectFile"));
app.use("/api/objectfile", require("./routes/ObjectFile"));
app.use('/api/getobjfile', require('./routes/Getfiles'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
