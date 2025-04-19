const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

router.get('/getAllVolunteerByNgoId/:id', volunteerController.getAllVolunteerByNgoId);
router.get('/getVolunteerByPostId/:id', volunteerController.getVolunteerByPostId);
router.post('/createVolunteer/:ngoId/:userId/:postId', volunteerController.createVolunteer);
router.get('/getAllVolunteer', volunteerController.getAllVolunteer);

module.exports = router;