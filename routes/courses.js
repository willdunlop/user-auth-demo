import express from "express";
import Joi from "joi";

import authorise from "../middleware/authorise";
import admin from "../middleware/admin";
import asyncMiddleware from "../middleware/async";
import { Course, validateCourse } from "../models/courses";
import { runInNewContext } from "vm";

const router = express.Router();



/** GET - /api/courses/ */
router.get("/", asyncMiddleware(async (req, res) => {
    const courses = await Course.find().sort("name");
    return res.send(courses);
}));

router.get("/:id", asyncMiddleware(async (req, res) => {
        const id = req.params.id;
        const course = await Course.findById(id);
        if (!course) { return res.status(404).send("Course could not be found"); }

        return res.send(course);
}));


router.post('/', authorise, async (req, res) => { 
    try {
        const result = validateCourse(req.body);
        if (result.error) { return res.status(400).send(result.error.details[0].message); }
    
        const course = new Course({ name: req.body.name, teacher: req.body.teacher });
        await course.save();

        return res.send(course);
    }

    catch (err) { return res.status(500).send(err.message) }
});


router.put('/:id', authorise, asyncMiddleware(async (req, res, next) => {
        const id = req.params.id;
        const course = await Course.findById(id);
        if (!course) { return res.status(404).send("Course could not be found"); }
    
        const { error } = validateCourse(req.body);
        if (error) { return res.status(400).send(error.details[0].message); }
    
        course.name = req.body.name;
        course.teacher = req.body.teacher;

        return res.send(course);
}));

router.delete("/:id", [authorise, admin], (req, res) => {
    console.log("entered route")
    const id = req.params.id   //  Params are pulled from req
    const selectedCourse = courses.find(course => course.id === parseInt(id));
    if(!selectedCourse) { return res.status(404).send("Course could not be found"); }

    const index = courses.indexOf(selectedCourse);
    courses.splice(index, 1);
    res.send(selectedCourse);
})


// router.get("/:id", (req, res) => {
//     const id = req.params.id   //  Params are pulled from req
//     const queries = req.query   //  Queries are pulled from
//     const selectedCourse = courses.find(course => course.id === parseInt(id));
//     if(!selectedCourse) { res.status(404).send("Course could not be found"); }
//     res.send(selectedCourse);
// })


export default router;