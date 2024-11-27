const { Router } = require("express");
const {
  auth,
  authlogin,
  authentication,
} = require("../Middlewares/middlewares");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel, purchasesModel } = require("../db");
const adminRouter = Router();

const jwtsecadmin = process.env.jwtadminsec;

adminRouter.post("/signup", auth, async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const response = await adminModel.findOne({
    email: email,
  });

  if (response) {
    return res.status(409).json({
      message: "This Email Already exists",
    });
  } else {
    try {
      const hashedpass = await bcrypt.hash(password, 3);

      await adminModel.create({
        email: email,
        password: hashedpass,
        firstname: firstname,
        lastname: lastname,
      });

      res.status(201).json({
        message: "You have Signed Up as Admin",
      });
    } catch (e) {
      res.status(500).json({
        message: "Some error occurred",
      });
    }
  }
});

adminRouter.post("/login", authlogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundadmin = await adminModel.findOne({
      email: email,
    });

    if (!foundadmin) {
      return res.status(404).json({
        message: "Email not found. Need to Signup First to become admin",
      });
    } else {
      const adminpass = foundadmin.password;
      const passcheck = await bcrypt.compare(password, adminpass);
      if (passcheck) {
        const adminId = foundadmin._id;
        const token = jwt.sign({ adminId }, jwtsecadmin);
        res.status(200).json({
          message: "You are Logged In as Admin",
          token: token,
        });
      } else {
        res.status(403).json({
          message: "Incorrect Password",
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "Some Error Occurred",
    });
  }
});

adminRouter.post("/createcourse", authentication, async (req, res) => {
  try {
    const token = req.val;

    const tokenverify = jwt.verify(token, jwtsecadmin);
    console.log("Token verified");

    const adminId = tokenverify.adminId;
    const { title, description, imgurl, price } = req.body;

    const existingCourse = await courseModel.findOne({ title });
    console.log("Course existence verified");

    if (existingCourse) {
      return res.status(400).json({
        message: `Course name ${existingCourse.title} already exists`,
      });
    }

    console.log("Creating the course...");
    const newCourse = await courseModel.create({
      title,
      description,
      imgurl,
      price: parseInt(price),
      creatorId: adminId,
    });

    console.log("Course created successfully");
    return res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (e) {
    console.error("Error:", e.message);

    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      message: "An error occurred",
      error: e.message,
    });
  }
});

adminRouter.get("/courses", authentication, async (req, res) => {
  try {
    const token = req.val;

    const adminfound = jwt.verify(token, jwtsecadmin);

    const adminId = adminfound._id;

    const courses = await courseModel.find({
      creatorId: adminId,
    });

    res.status(200).json({
      courses: courses,
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid User",
    });
  }
});

adminRouter.patch(
  "/updateCourse/:coursename",
  authentication,
  async (req, res) => {
    const title = req.params.coursename;
    const updates = req.body;
    try {
      const token = req.val;

      const founduser = jwt.verify(token, jwtsecadmin);

      if (!founduser) {
        return res.status(401).json({ message: "Unauthorized User" });
      }
      const course = await courseModel.findOne({
        title,
      });

      if (!course) {
        return res.status(404).json({
          message: "Course Not Found",
        });
      }

      if (course.creatorId.toString() !== founduser.adminId.toString()) {
        return res.status(403).json({
          message:
            "You are not authorized as you are not the creator of the course",
        });
      }
      const updatedCourse = await courseModel.findOneAndUpdate(
        { title },
        updates,
        { new: true }
      );

      res.status(200).json({
        message: "Course updated successfully",
        updatedCourse,
      });
    } catch (error) {
      res.status(500).json({ message: "Unauthorized", error: error.message });
    }
  }
);

adminRouter.delete(
  "/deletecourse/:coursetitle",
  authentication,
  async (req, res) => {
    const title = req.params.coursetitle;
    try {
      const token = req.val;

      const founduser = jwt.verify(token, jwtsecadmin);

      if (!founduser) {
        return res.status(401).json({ message: "Unauthorized User" });
      }

      const course = await courseModel.findOne({ title });

      if (!course) {
        return res.status(404).json({ message: "Course Not Found" });
      }

      if (course.creatorId.toString() !== founduser.adminId.toString()) {
        return res.status(403).json({
          message: "You are not authorized to delete this course",
        });
      }

      await courseModel.deleteOne({ title });

      res.status(200).json({
        message: "Course deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  }
);

module.exports = adminRouter;
