const helmet = require("helmet");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const express = require("express");

const logger = require("./middleware/logger");
const home = require("./routes/home");
const courses = require("./routes/courses");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
app.use("/", home);
app.use("/api/courses", courses);

// CONFIGURATIONS
console.log(`Application name ${config.get("name")}`);
console.log(`Mail server ${config.get("mail.host")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled....");
}

dbDebugger("Connected to the database...");

app.use((req, res, next) => {
  console.log("Authenticating");
  next();
});

//
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
