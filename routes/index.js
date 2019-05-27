import express from "express";

import courses from "./courses";
import users from "./users";
import auth from "./auth";


const router = express.Router();

router.use("/courses", courses);
router.use("/users", users);
router.use("/auth", auth);

export default router;