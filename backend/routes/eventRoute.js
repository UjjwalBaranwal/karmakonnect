const eventController = require("../controllers/eventController");
const express = require("express");
const ngoController = require("../controllers/ngoController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post(
  "/eventVolunteerMapping/:id",
  userController.protect,
  eventController.addVolunteerInEvent
);
router.get("/:id", eventController.getEventById);
router.get("/ngo/:id", eventController.getEventByNGOId);
// router.use(ngoController.protect);
router.post("/create", eventController.createEvent);
router.get("/fillSideBar/:id", eventController.fillSideBar);

module.exports = router;
