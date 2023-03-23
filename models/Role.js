const Sequelize = require("sequelize");
const sequelizeSchema = require("../utils/database");

const User = sequelizeSchema.define("role",{
  id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
  },
  name:{
      type: Sequelize.STRING,
      allowNull: false,
  }
})

module.exports = User