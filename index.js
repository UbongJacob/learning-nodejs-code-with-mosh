const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

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
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.status(201).send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const reqID = req.params.id;
  const course = courses.find((course) => course.id === parseInt(reqID));
  if (!course) {
    res
      .status(404)
      .send(`The course with the given ID ${reqID} was not found.`); //404
  } else res.send(course);
});

//
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
