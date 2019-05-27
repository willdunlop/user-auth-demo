import express from "express";

import courses from "./courses";
import users from "./users";

const router = express.Router();

router.use("/courses", courses);
router.use("/users", users);

export default router;