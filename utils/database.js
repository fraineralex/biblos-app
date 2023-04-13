const { Sequelize } = require("sequelize");
const path = require("path");

const sequelizeSchema = new Sequelize("sqlite::memory:", {
  dialect: "sqlite",
  logging: false,
  storage: path.join(
    path.dirname(require.main.filename),
    "database",
    "biblosApp.sqlite"
  ),
});

sequelizeSchema
  .authenticate()
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelizeSchema;
