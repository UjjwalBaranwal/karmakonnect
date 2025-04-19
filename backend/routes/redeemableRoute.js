const redeemableController = require("../controllers/redeemableController");
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/:id", redeemableController.getRedeemableById);
router.get("/", redeemableController.getAllRedeemables);
router.use(userController.protect);
router.post("/redeem/:id", redeemableController.redeemById);
router.use(userController.restrictTo("admin"));
router.post("/", redeemableController.createRedeemableItem);
router.put("/:id", redeemableController.updateRedeemableById);
router.delete("/:id", redeemableController.deleteById);

module.exports = router;
