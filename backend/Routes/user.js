const { Router } = require("express");
const { userModel, courseModel, purchasesModel, adminModel } = require("../db");
const bcrypt = require("bcrypt");
const userRouter = Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {
  auth,
  authlogin,
  authentication,
} = require("../Middlewares/middlewares");
const jwtsecUser = process.env.jwtusersec;

userRouter.post("/signup", auth, async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const response = await userModel.findOne({
    email: email,
  });

  if (response) {
    return res.status(409).json({
      message: "This Email Already exists",
    });
  } else {
    try {
      const hashedpass = await bcrypt.hash(password, 3);

      await userModel.create({
        email: email,
        password: hashedpass,
        firstname: firstname,
        lastname: lastname,
      });

      res.status(201).json({
        message: "Sign Up Successful now Login",
      });
    } catch (e) {
      res.status(500).json({
        message: "Some error occurred",
      });
    }
  }
});

userRouter.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message:
        "Bad JSON format. Please ensure you're sending valid JSON with double quotes.",
    });
  }
  next(err);
});

module.exports = {
  userRouter,
};

userRouter.post("/login", authlogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const founduser = await userModel.findOne({
      email: email,
    });

    if (!founduser) {
      return res.status(404).json({
        message: "Looks like you are new here Signup to Continue",
      });
    } else {
      const userpass = founduser.password;
      const passcheck = await bcrypt.compare(password, userpass);
      if (passcheck) {
        const userId = founduser._id;
        const token = jwt.sign({ userId }, jwtsecUser);
        res.status(200).json({
          message: "You are Logged In",
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

userRouter.get("/mycourses", authentication, async (req, res) => {
  try {
    const token = req.val;

    const resp = jwt.verify(token, jwtsecUser);

    const userid = resp.userId;

    const courses = await courseModel.find({ userid });

    res.status(200).json({
      courses: courses,
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid User",
    });
  }
});

userRouter.post("/purchasecourse", authentication, async (req, res) => {
  try {
    const token = req.val;
    const jwtresp = jwt.verify(token, jwtsecUser);
    const userid = jwtresp.userId;
    const { courseId } = req.body;

    const dbresponse = await purchaseModel.find({ _id: courseId });
    if (!dbresponse) {
      return res.status(404).json({ message: "This Course Does not exist" });
    }

    const existingCourse = await purchaseModel.findOne({
      courseId,
      userid,
    });
    if (existingCourse) {
      return res.status(409).json({
        message: "You have already Purchased this course",
      });
    }
    const purchasedCourse = await purchasesModel.create({
      userId: userid,
      courseId: dbresponse._id,
    });

    return res.status(200).json({
      message: "Your Purchase was Succesfull",
      course: purchasedCourse,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Invalid or expired authentication token." });
    }

    return res.status(500).json({
      message: "An Internal Server Error Occurred",
    });
  }
});

userRouter.post("/courses/:id", async(req, res) => {
  try{ const { id } = req.params;
  console.log(id);
  const response = await courseModel.findOne({ _id: id });

  if(!response){
    return res.status(404).json({
      message: "This Course Does not exist"
    });
  }
  const adminId = response.creatorId;
  const admindet = await adminModel.findOne({
      _id: adminId
  })

  return res.status(201).json({
    message: "Course Found",
    course: response,
    admin: {
      firstname: admindet.firstname,
      lastname: admindet.lastname
    }
  });}
  catch(e){
    return res.status(500).json({ message: "Server Connection Failed"});
  }
})


module.exports = userRouter;
