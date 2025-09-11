const express = require("express");
const router = express.Router();
const alumniController = require("../Controllers/alumniController.js");

// CRUD routes
router.post("/create-alumni", alumniController.createAlumni);
router.get("/all", alumniController.getAllAlumni);
router.get("/:userId", alumniController.getAlumniByUserId);
router.put("/:userId", alumniController.updateAlumni);
router.delete("/:userId", alumniController.deleteAlumni);

module.exports = router;
