const mongoose=require("mongoose");

const rsvpSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["accepted", "rejected", "pending"], default: "pending" }
}, { timestamps: true });

const RSVP=mongoose.model("RSVP", rsvpSchema);
module.exports=RSVP