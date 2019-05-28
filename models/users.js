import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";


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
    },
    isAdmin: Boolean
});


userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('JWT_PRIVATE_KEY')); 
    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}


export { User, validateUser };