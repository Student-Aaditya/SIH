const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, 
      required: true,
    },
    endTime: {
      type: String, 
      required: true,
    },
    targetAudience: {
      type: String,
      enum: ["student", "alumni"], 
       required: true,
    },
    targetAlumni: {
      type: String, 
      default: "",
    },
    notifyStudents: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bannerImage: {
      type: String, 
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
