const donationController = require("../controllers/donationController");
const express = require("express");
const router = express.Router();

router.post("/donation", donationController.createDonation);
router.get("/:id", donationController.getDonationById);
router.get("/user/:userId", donationController.getDonationByUserId);
router.get("/ngo/:ngoId", donationController.getDonationByNgoId);
router.patch("/approve/:id", donationController.approveDonation);

module.exports = router;
