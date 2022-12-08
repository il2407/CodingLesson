const express = require("express");
const router = express.Router();
require("dotenv").config();

const sessionsController = require("../controllers/sessions");

// Adding new user details
// Method: POST
router.post("/createsession", sessionsController.sessions_add_new_session);

module.exports = router;
