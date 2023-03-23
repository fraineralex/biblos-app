const Sequelize = require("sequelize");
const sequelizeSchema = require("../utils/database");

const Cart = sequelizeSchema.define("cart",{
  id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
  },
  amount:{
      type: Sequelize.DECIMAL,
      allowNull: false,
  }
})

module.exports = Cart