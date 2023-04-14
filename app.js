const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./utils/database");
const relationships = require("./models/RelationShips");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const homeRoute = require("./routes/HomeRoute");
const authRoutes = require("./routes/AuthRoutes");
const BooksRoutes = require("./routes/BooksRoutes");

const errorController = require("./controllers/ErrorController");

const { getDiscount, showAlert } = require("./utils/commonHelper");

const app = express();

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      getDiscount: getDiscount,
      showAlert: showAlert,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

//session
app.use(
  session({
    secret: process.env.SECRET || "biblosapp",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((request, response, next) => {
  const errors = request.flash("errors");
  const success = request.flash("success");
  response.locals.errorMessages = errors;
  response.locals.hasErrorMessages = errors.length > 0;
  response.locals.successMessages = success;
  response.locals.hasSuccessMessages = success.length > 0;

  response.locals.isAuthenticated = request.session.isLoggedIn;
  response.locals.user = request?.session?.user ?? "";
  next();
});

//multer
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
app.use(multer({ storage: imageStorage }).single("ImageFile"));

app.use(homeRoute);
app.use(authRoutes);
app.use(BooksRoutes);
app.use(errorController.Get404);

//? Para poder crear un libro quite las relaciones ya que no tenemos crud de las relaciones
// relationships();

const PORT = process.env.PORT || 3001;
const server = sequelize
  .sync(/* { alter: true } */)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(err));

module.exports = { app, server };
