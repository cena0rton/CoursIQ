const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { string } = require("zod");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

const courseSchema = new Schema({
  title: { type:String, unique: true },
  description: String,
  imgurl: String,
  price: Number,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Use `ref` for referencing the Admin model (if available)
    required: true, unique: false
  }
});

const purchasesSchema = new Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const userModel = model("Users", userSchema);
const adminModel = model("Admin", adminSchema);
const courseModel = model("Courses", courseSchema);
const purchasesModel = model("Purchases", purchasesSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchasesModel,
};
