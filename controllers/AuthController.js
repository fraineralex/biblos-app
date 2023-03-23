const bcrypt = require('bcrypt')
const { or } = require('sequelize')
const User =  require('../models/User')
const { Op } = require("sequelize");

exports.getSignUp = (req, res, next) => {

    res.status(200).render('register/signUp', {
        pageTitle: 'Sign up'
    })
}

exports.postSignUp = async (request, response) => {
    const { body } = request
    const {
        username,
        name,
        lastName,
        phone,
        email,
        address,
        roleId,
        password,
        confirmPassword
    } = body

    const imageProfile = body.imageProfile ? `/${body.imageProfile.path}` : null

    if (password !== confirmPassword) {
        request.flash("errors", "Las contraseñas no son similares");
        return response.redirect("/register-user");
    }

    const searchCriteria = {
        where: {
          [Op.or]: { email }, username
        }
    };

    const userAlreadyExist = await User.findOne({ ...searchCriteria });
    
    if (userAlreadyExist) {
        request.flash("errors", "Ya existe un usuario con este correo.");
        return response.redirect("/register-user");
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const isActive = true

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
      passwordHash
    })
  
    //const savedUser = await user.save()

    request.flash("success",`${savedUser.name} ${savedUser.lastName} tu cuenta ha sido registrada correctamente.`);
    // response.status(201).json(savedUser)
    response.redirect("/");
  }