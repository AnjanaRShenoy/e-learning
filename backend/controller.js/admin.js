import asyncHandler from "express-async-handler";
import User from "../model/studentModel.js";
import Course from "../model/courseModel.js";
import generateToken from "../utils/generateToken.js";
import Category from "../model/categoryModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });      //checks if user exists
  if (user && (await user.matchPassword(password))) {     //checks if passwords match
    if (user.isAdmin == 1) {                              //checks if isAdmin is true
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      });
    }
    else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const addCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.create({
      courseName: req.body.name,
      time: req.body.time,
      description: req.body.description,
      date:req.body.date,
      category:req.body.category
    })
    res.status(200).json("Course created successfully")
  } catch (err) {
    console.log(err);
  }
})

const addCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      categoryName: req.body.category,
      
    })
    res.status(200).json("Category created successfully")
  } catch (err) {
    console.log(err);
  }
})

const getCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.find()
    res.status(200).json(course)
  } catch (err) {
    console.log(err);
  }
})
const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find()
    res.status(200).json(category)
  } catch (err) {
    console.log(err);
  }
})

export {
  authAdmin,
  addCourse,
  getCourse,
  addCategory,
getCategory,
};
