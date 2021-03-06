import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";

import authorise from "../middleware/authorise";
import asyncMiddleware from "../middleware/async";
import { User, validateUser } from "../models/users";
import { runInNewContext } from "vm";

const router = express.Router();

/** GET - /api/users/current */
router.get("/current", authorise, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select("-hash");     //  "-hash" will exclude the password from the result
    res.send(user);
}))

/** POST - /api/users/ */
router.post("/", asyncMiddleware(async (req, res) => {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("This email already has an account.");
    
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user = new User({ username, email, hash });
    
        await user.save();
        const token = user.generateToken();
        const userResponse = _.pick(user, ["_id", "username", "email"]);
        res.header('x-auth-token', token).send(userResponse);
}));

export default router;