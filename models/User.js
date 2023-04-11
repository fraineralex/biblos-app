const {Sequelize} = require("sequelize");
const sequelizeSchema = require("../utils/database");

const User = sequelizeSchema.define("user",{
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
  lastName:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  phone:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageProfile:{
      type: Sequelize.STRING,
      allowNull: true,
  },
  email:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  username:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
  },
  isActive:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: true
},
  passwordHash:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  resetToken:{
      type: Sequelize.STRING,
      allowNull: true,
  },
  resetTokenExpiration:{
      type: Sequelize.DATE,
      allowNull: true,
  },
})

module.exports = User;