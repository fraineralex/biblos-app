const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./utils/database");
const relationships = require("./models/RelationShips")

const homeRoute = require("./routes/HomeRoute");
const authRoutes = require("./routes/AuthRoutes");

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
app.use(authRoutes);
app.use(errorController.Get404);

relationships()

const PORT = process.env.PORT || 3001
const server = sequelize.sync({ force: true }).then(() =>
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })).catch((err) =>console.log(err));

module.exports = { app, server }
