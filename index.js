const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

const notFoundMessage = (id) =>
  `The course with the given ID ${id} was not found.`;

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
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

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  const reqID = req.params.id;
  const course = courses.find((course) => course.id === parseInt(reqID));
  // If not existing,return 404
  if (!course) {
    res.status(404).send(notFoundMessage(reqID)); //404
    return;
  }

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

app.get("/api/courses/:id", (req, res) => {
  const reqID = req.params.id;
  const course = courses.find((course) => course.id === parseInt(reqID));
  if (!course) {
    res.status(404).send(notFoundMessage(reqID)); //404
    return;
  } else res.send(course);
});

function validateCourse(course) {
  //   Validate course
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

//
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
