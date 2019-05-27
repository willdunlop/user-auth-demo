import express from "express";

const router = express.Router();

const courses = [
    { id: 1, name: "Course-01" },
    { id: 2, name: "Course-02" },
    { id: 3, name: "Course-03" },
]

// log.db("Courses", courses)

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}



/** Write up some endpoints */
router.get("/", (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) { return res.status(400).send(result.error.details[0].message); }

    const courseName = req.body.name;
    const course = {
        id: courses.length + 1,
        name: courseName,
    };
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req, res) => {
    const id = req.params.id   //  Params are pulled from req
    const selectedCourse = courses.find(course => course.id === parseInt(id));
    if(!selectedCourse) { return res.status(404).send("Course could not be found"); }

    const result = validateCourse(req.body);
    if (result.error) { return res.status(400).send(result.error.details[0].message); }

    selectedCourse.name = req.body.name;
    res.send(selectedCourse);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id   //  Params are pulled from req
    const selectedCourse = courses.find(course => course.id === parseInt(id));
    if(!selectedCourse) { return res.status(404).send("Course could not be found"); }

    const index = courses.indexOf(selectedCourse);
    courses.splice(index, 1);
})


// router.get("/:id", (req, res) => {
//     const id = req.params.id   //  Params are pulled from req
//     const queries = req.query   //  Queries are pulled from
//     const selectedCourse = courses.find(course => course.id === parseInt(id));
//     if(!selectedCourse) { res.status(404).send("Course could not be found"); }
//     res.send(selectedCourse);
// })


export default router;