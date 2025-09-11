// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/studentController.js");

router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
