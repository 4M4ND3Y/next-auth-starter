import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "Please provide a username"],
    unique: [
      true,
      "That username is already taken! Please provide another one...",
    ],
    trim: true,
  },

  email: {
    type: "string",
    required: [true, "Please provide a email"],
    unique: [true, "That email already exists! Please login with the email..."],
    trim: true,
  },

  password: {
    type: "String",
    required: [true, "Please provide a password"],
    trim: true,
  },

  isVerified: {
    type: "Boolean",
    default: false,
  },

  isAdmin: {
    type: "Boolean",
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
