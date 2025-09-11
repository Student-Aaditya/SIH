const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController.js");

// Create event
router.post("/", eventController.createEvent);

// Get all events
router.get("/", eventController.getEvents);

// Get single event by ID
router.get("/:id", eventController.getEventById);

// Register user for event
router.post("/:id/register", eventController.registerForEvent);

// Delete event
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
