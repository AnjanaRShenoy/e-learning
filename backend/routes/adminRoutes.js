import express from "express";
import { authAdmin, addCourse, getCourse, addCategory, getCategory } from "../controller.js/admin.js";

const router = express.Router();

router.post("/auth", authAdmin);
router.post("/addCourse", addCourse);
router.get("/getCourse", getCourse);
router.get("/getCategory", getCategory);
router.post("/addCategory", addCategory);





export default router;