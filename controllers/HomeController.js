const Role = require("../models/Role");
const Books = require("../models/Book");

exports.GetHome = async (req, res, next) => {
  const areDefaultRolesCreated = await Role.findAll();

  const books = await Books.findAll({ raw: true });

  if (!areDefaultRolesCreated) {
    await Role.create({ name: "user" });
    await Role.create({ name: "author" });
    await Role.create({ name: "admin" });
  }

  res
    .status(404)
    .render("home", { pageTitle: "Home", isHomeActive: true, books });
};
