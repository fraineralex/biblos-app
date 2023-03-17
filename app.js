const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const homeRoute = require("./routes/HomeRoute");
const errorController = require("./controllers/ErrorController");

const app = express();

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoute);
app.use(errorController.Get404);

app.listen(3001);
