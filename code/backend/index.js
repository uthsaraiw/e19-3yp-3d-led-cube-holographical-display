const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();

const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// middleware for json()
app.use(express.json());
//sd


// user routes
app.use("/api/", require("./routes/user"));
app.use("/api/", require("./routes/ObjectFile"));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})