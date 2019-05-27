import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";

import { User, validateUser } from "../models/users";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("This email already has an account.");
    
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user = new User({ username, email, hash });
    
        await user.save();
        const userResponse = _.pick(user, ["_id", "username", "email"]);
        res.send(userResponse);
    } catch (err) {
        res.status(500).send(err.message)
    }
});

export default router;