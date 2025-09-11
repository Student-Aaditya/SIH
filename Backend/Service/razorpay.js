require("dotenv").config();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET
});


const Payment = {
  viewPayment: (req, res) => {
    res.render("index", { key_id: process.env.RAZOR_ID }); 
  },

  createPayment: async (req, res) => {
    try {
      const options = {
        amount: req.body.amount * 100, 
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      };
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Payment creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  },

  verifyPayment: (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto.createHmac("sha256", process.env.RAZOR_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  }
};

module.exports = Payment;
