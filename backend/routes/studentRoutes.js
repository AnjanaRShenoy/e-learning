import express from "express";
import { registerUser, authUser, logoutUser, getCourse, detailPage, getFullDetails,enroll,getEnrolledList,updateProfile, startCourse,getProfile } from "../controller.js/student.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/getCourse", getCourse);
router.get("/detailPage", detailPage);
router.get("/getFullDetails", getFullDetails);
router.post("/enroll", enroll);
router.get("/getEnrolledList", getEnrolledList);
router.post("/startCourse", startCourse);
router.get("/getProfile", getProfile);
router.post("/updateProfile", updateProfile);

export default router;