import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";

import { User } from "../models/users";

const router = express.Router();

/** POST - /api/auth/ */
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send("Invalid email or password");
    
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");
    
        const validPassword = await bcrypt.compare(req.body.password, user.hash);
        if (!validPassword) return res.status(400).send("Invalid email or password");

        const token = user.generateToken();

        res.send(token);
    } catch (err) {
        res.status(500).send(err.message)
    }
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(req, schema);
}


export default router;