const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.use(userController.protect);
router.get("/logout", userController.logout);
router.get("/me", userController.protect, userController.getMe);
router.get('/getUser/:id', userController.findUser);
// router.get('/getUser')

module.exports = router;
