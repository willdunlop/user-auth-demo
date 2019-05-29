import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 100
    },
    teacher: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    }
});


// courseSchema.methods.generateToken = function() {
//     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('JWT_PRIVATE_KEY')); 
//     return token;
// }

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        teacher: Joi.string().min(4).max(100).required()
    }

    return Joi.validate(course, schema);
}


export { Course, validateCourse };