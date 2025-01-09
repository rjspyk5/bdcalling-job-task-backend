const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: "Invalid email format",
      },
    },

    password: { type: String, required: [true, "Password is required"] },
    phoneNumber: { type: Number },
    profileImage: { type: String },
    userName: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
