const express = require("express");

const homeController = require("../controller/home");

const router = express.Router();

router.post("/register", homeController.register);
router.post("/login", homeController.login);
router.get("/designations", homeController.designations);

module.exports = router;
