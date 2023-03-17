exports.GetHome = (req, res, next) => {
  res.status(404).render("home", { pageTitle: "Home" });
};
