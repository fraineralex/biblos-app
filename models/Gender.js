const Sequelize = require("sequelize");
const sequelizeSchema = require("../utils/database");

const Gender = sequelizeSchema.define("gender",{
  id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
  },
  name:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false,
    }
})

module.exports = Gender