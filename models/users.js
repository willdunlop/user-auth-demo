import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255
    },
    hash: {
        type: String,
        required: true,
        minLength: 5,
        maqxLenght: 1024,
    }
});

function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

export { User, validateUser };