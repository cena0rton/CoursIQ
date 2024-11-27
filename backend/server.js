const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const { z } = require("zod");
const { default: mongoose } = require("mongoose");
const { response } = require("express");
const { userRouter, adminRouter } = require("./Routes");
const { courseModel } = require("./db");
require('dotenv').config();

const app = express();
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MongoDBURL
    );
    console.log("connected to DB");
  } catch (e) {
    console.log("error connecting to DataBase");
  }
};

connectDB();

app.use(cors());

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res
      .status(400)
      .json({ message: "Bad JSON format. Please use double quotes." });
  }
  next();
});

app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.get("/courses", async (req, res) => {
  try {
    const courses = await courseModel.find({});

    res.json({
      courses: courses,
    });
  } catch (error) {
    res.status(403).json({
      message: "Failed to load courses",
    });
  }
});

// app.use("/courses", courseRouter);

app.listen(3000);
