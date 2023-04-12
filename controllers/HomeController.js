const Role =  require('../models/Role')

exports.GetHome = async (req, res, next) => {
  const areDefaultRolesCreated = await Role.findAll()
  
  if(!areDefaultRolesCreated){
    await Role.create({name: 'user'})
    await Role.create({name: 'author'})
    await Role.create({name: 'admin'})
  }

  res.status(404).render("home", { pageTitle: "Home", isHomeActive: true });
};
