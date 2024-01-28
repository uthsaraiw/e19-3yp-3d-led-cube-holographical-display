const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  image: {
    type: String, // You can adjust the type based on your image storage strategy (e.g., URL, file path, etc.)
  },
  followersCount: {
    type: Number,
    default: 0,
  },
  followers: [
    {
      type: String, // Assuming each element in the array is an email string
    },
  ],
  followingCount: {
    type: Number,
    default: 0,
  },
  following: [
    {
      type: String, // Assuming each element in the array is an email string
    },
  ],
});

// Pre-save middleware to hash the password before saving the user
UserSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified or is new
    if (!this.isModified("password")) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Update the user's password with the hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
