const express = require("express");

const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello WorlSssd");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
