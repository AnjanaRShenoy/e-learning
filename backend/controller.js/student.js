import asyncHandler from "express-async-handler";
import User from "../model/studentModel.js";
import generateToken from "../utils/generateToken.js";
import Course from "../model/courseModel.js";
import Enrol from "../model/enrolModel.js";

const authUser = asyncHandler(async (req, res) => {
  if (req.body.gmail === true) {

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        email: user.email,

      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,

      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }

});

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if (req.body.gmail === true) {
    const user = await User.create({
      name,
      email
    })
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
  else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }

})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

const getCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.find()

    res.status(200).json(course)
  } catch (err) {
    console.log(err);
  }
})
const detailPage = asyncHandler(async (req, res) => {
  try {
    console.log(req.query._id);
    const post = await Course.findOne({ _id: req.query._id })

    res.status(200).json(post)
  } catch (err) {
    console.log(err);
  }
})

const getFullDetails = asyncHandler(async (req, res) => {
  try {

    const course = await Course.findOne({ _id: req.query._id })
    const enroll = await Enrol.findOne({ studentId: req.query.userInfo._id, course: req.query._id })

    res.status(200).json({ course, enroll })
  } catch (err) {
    console.log(err);
  }
})

const enroll = asyncHandler(async (req, res) => {

  try {

    const enrollExist = await Enrol.findOne({
      studentId: req.body.userInfo._id,
      course: req.body.postId
    })
    if (enrollExist) {
      const course = await Enrol.findOneAndDelete({
        studentId: req.body.userInfo._id,
        course: req.body.postId
      })
      const enroll = await Course.findOneAndUpdate({
        _id: req.body.postId
      }, { $inc: { enrollment: -1 } },
        { new: true })

    } else {
      const course = await Enrol.create({
        studentId: req.body.userInfo._id,
        course: req.body.postId
      })
      const enroll = await Course.findOneAndUpdate({
        _id: req.body.postId
      }, { $inc: { enrollment: 1 } },
        { new: true })
    }

    res.status(200).json("successful")
  } catch (err) {
    console.log(err);
  }
})

const getEnrolledList = asyncHandler(async (req, res) => {
  try {
    const enrollment = await Enrol.find({ studentId: req.query.userInfo._id }).populate("course")


    res.status(200).json(enrollment)
  } catch (err) {
    console.log(err);
  }
})
const startCourse = asyncHandler(async (req, res) => {
  try {
if(req.body.params)
    {const postId = req.body.params._id
    const userId = req.body.params.userInfo._id
    const find = await Enrol.findOne(
      { studentId: userId, course: postId })
    // console.log(find,"find");
    const statusUpdate = await Enrol.findOneAndUpdate(
      { studentId: req.body.params.userInfo._id, course: req.body.params._id },

      { status: "started" },
      { new: true })

    res.status(200).json(statusUpdate);}
    else{
      
    }
  } catch (err) {
    console.log(err);
  }
})

const getProfile=asyncHandler(async(req,res)=>{
  try{
    const user= await User.findOne({_id:req.query._id})
    res.status(200).json(user)
  }catch(err){
    console.log(err);
  }
})

const updateProfile=asyncHandler(async(req,res)=>{
  try{
    
    const user = await User.findOne({ _id: req.body.params.userInfo._id });
  
    if (user) {
      user.name = req.body.params.name 
      User.email = req.body.params.email 
      
     
      const updatedUser = await user.save();
      res.status(200).json("successful");
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }catch(err){
    console.log(err);
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getCourse,
  detailPage,
  getFullDetails,
  enroll,
  getEnrolledList,
  startCourse,
  getProfile,
  updateProfile,
};
