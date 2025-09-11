const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String, // stored as "YYYY-MM-DD"
      required: true,
    },
    time: {
      type: String, // stored as "HH:mm"
      required: true,
    },
    duration: {
      type: Number,
      default: 1, // in hours
    },
    notify: {
      type: Boolean,
      default: false,
    },
    targetAlumni: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni", // assuming you have Alumni model
      },
    ],
    registered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // assuming you have Student model
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
