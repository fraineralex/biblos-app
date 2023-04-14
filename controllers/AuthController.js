const bcrypt = require("bcrypt");
const { or } = require("sequelize");
const User = require("../models/User");
const { Op } = require("sequelize");

exports.getSignUp = (req, res, next) => {
  res.status(200).render("register/signUp", {
    pageTitle: "Sign up",
  });
};

exports.postSignUp = async (request, response) => {
  const { body } = request;
  const {
    username,
    name,
    lastName,
    phone,
    email,
    address,
    roleId,
    password,
    confirmPassword,
  } = body;

  const requiredFields = {
    username: "No se encontró el nombre de usuario",
    name: "No se encontró el nombre",
    lastName: "No se encontró apellido",
    phone: "No se encontró número de teléfono",
    email: "No se encontró correo electrónico",
    address: "No se encontró  dirección",
    roleId: "No se encontró el rol de la cuenta",
    password: "No se encontró la contraseña",
    confirmPassword: "No se encontró la confirmación de la contraseña",
  };

  const errors = [];

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!body[field]) {
      errors.push(message);
    }
  }

  if (errors.length > 0) {
    request.flash("errors", errors);
    return response.redirect("/register-user");
  }

  const imageProfile = request.file ? `/${request.file.path}` : null;

  if (password !== confirmPassword) {
    request.flash("errors", "Las contraseñas no son similares");
    return response.redirect("/register-user");
  }

  const searchCriteria = {
    where: {
      [Op.or]: { email },
      username,
    },
  };

  const userAlreadyExist = await User.findOne({ ...searchCriteria });

  if (userAlreadyExist) {
    request.flash("errors", "Ya existe un usuario con este correo.");
    return response.redirect("/register-user");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const isActive = true;

  const savedUser = await User.create({
    username,
    name,
    lastName,
    phone,
    imageProfile,
    email,
    address,
    isActive,
    roleId,
    passwordHash,
  });

  //const savedUser = await user.save()

  request.flash(
    "success",
    `${savedUser.name} ${savedUser.lastName} tu cuenta ha sido registrada correctamente.`
  );
  // response.status(201).json(savedUser)
  response.redirect("/");
};

exports.PostLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        req.flash("errors", "Usuario no encontrado ");
        return res.redirect("/");
      }
      bcrypt
        .compare(password, user.passwordHash)
        .then((result) => {
          if (result) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            return req.session.save((err) => {
              req.flash("success", `Bienvenido al sistema ${user.name}`);
              res.redirect("/");
            });
          }
          req.flash("errors", "Contraseña invalida");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          req.flash(
            "errors",
            "An error has occurred contact the administrator."
          );
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
      req.flash("errors", "An error has occurred contact the administrator.");
      res.redirect("/login");
    });
};

exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};
