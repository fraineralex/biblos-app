const express = require("express");
const homeController = require("../controllers/HomeController");

const router = express.Router();

router.get("/", homeController.GetHome);

module.exports = router;
