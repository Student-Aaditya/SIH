const mongoose=require("mongoose");

const donationSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true
   },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Event",
      default: null 
    },
  amount: { type: Number, required: true },
  transactionHash: { type: String, required: true },
}, { timestamps: true });

const Donation= mongoose.model("Donation", donationSchema);
module.exports=Donation;