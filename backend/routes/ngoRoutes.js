const express = require("express");
const router = express.Router();
const ngoController = require("../controllers/ngoController");

router.post("/signup", ngoController.signUp);
router.post("/login", ngoController.login);
router.get("/logout", ngoController.logout);
router.get("/me", ngoController.getMe, ngoController.getNgo);

module.exports = router;
