const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alumni",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    transactionIdHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema); 