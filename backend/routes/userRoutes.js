const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/me", userController.getMe, userController.getUser);

module.exports = router;
