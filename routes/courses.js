const express = require("express");
const Joi = require("joi");

const router = express.Router();

const notFoundMessage = (id) =>
  `The course with the given ID ${id} was not found.`;

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  //   Validate course
  const { error } = validateCourse(req.body);
  // if invalid  return 400 -Bad request
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.status(201).send(course);
});

router.put("/:id", (req, res) => {
  // Look up the course
  const reqID = req.params.id;
  const course = courses.find((course) => course.id === parseInt(reqID));
  // If not existing,return 404
  if (!course) return res.status(404).send(notFoundMessage(reqID)); //404

  //   Validate course
  const { error } = validateCourse(req.body);
  // if invalid  return 400 -Bad request
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  // Update course
  course.name = req.body.name;
  res.send(course);
  // Return the updated course
});

router.delete("/:id", (req, res) => {
  // Look up the course
  const reqID = req.params.id;
  const course = courses.find((course) => course.id === parseInt(reqID));
  // If not existing,return 404
  if (!course) return res.status(404).send(notFoundMessage(reqID)); //404

  //   Validate course
  const { error } = validateCourse(req.body);
  // if invalid  return 400 -Bad request
  if (error) return res.status(400).send(error.message);

  // Delete course
  const courseIndex = courses.indexOf(course);
  courses.splice(courseIndex, 1);

  // Return the deleted course
  res.send(course);
});

router.get("/:id", (req, res) => {
  const reqID = req.params.id;
  const course = courses.find((course) => course.id === parseInt(reqID));
  if (!course) return res.status(404).send(notFoundMessage(reqID)); //404

  res.send(course);
});

function validateCourse(course) {
  //   Validate course
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports = router;
