const { Sequelize } = require("sequelize");
const sequelizeSchema = require("../utils/database");

const Book = sequelizeSchema.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Book;
