const User = require("../models/User");
const Books = require("../models/Book");

exports.GetBooks = (req, res, next) => {
  Books.findAll({ raw: true }).then((result) => {
    return res.json({
      result,
    });
  });
};

exports.AddBook = async (request, response) => {
  const { title, description, price } = request.body;
  const { file } = request;

  const img = `/${file.path}`;

  if (!title || !description || !price) {
    response.redirect("/");
  }

  Books.create({
    title: title,
    description: description,
    price: price,
    img: img,
  })
    .then((result) => {
      return response.json({
        ok: true,
        result,
      });
    })
    .catch((err) => {
      return response.json({
        ok: false,
        err,
      });
    });
};
