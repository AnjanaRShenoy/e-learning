import express from "express";
import { registerUser, authUser, logoutUser, getCourse, detailPage, getFullDetails,enrol,getEnrolledList, startCourse } from "../controller.js/student.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/getCourse", getCourse);
router.get("/detailPage", detailPage);
router.get("/getFullDetails", getFullDetails);
router.post("/enrol", enrol);
router.get("/getEnrolledList", getEnrolledList);
router.post("/startCourse", startCourse);

export default router;