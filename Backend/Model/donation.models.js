const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  alumni: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni",   
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  transactionIdHash: String,
}, { timestamps: true });

module.exports = mongoose.model("Donation", DonationSchema);
