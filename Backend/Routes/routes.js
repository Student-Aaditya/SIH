const controller=require("../Controllers/controller");
const express=require("express");
const router=express.Router();
const passport=require("passport");
const passportLocal=require("passport-local");
const passportLocalMongoose=require("passport-local-mongoose");
const Payment=require("../Service/razorpay.js");
const upload = require("../Service/cloudConfig");
const addressValidationSchema=require("../Validators/user.js");
const isLoggedIn=require("../Middlewares/loginMiddleware.js");
const validate=require("../Middlewares/validate.js");


router.post("/user/signUp",validate(addressValidationSchema),controller.signUp);
router.post("/user/login",controller.logIn);
router.get("/user/sms",controller.smsRoute);
router.get("/user/email",controller.emailRoute);
router.post("/user/create-alumini",controller.createAlumini);
router.post("/user/upload",upload.single("file"),controller.uploadImage);
router.get("/user/paymentPage",Payment.viewPayment);
router.post("/user/create",Payment.createPayment);
router.post("/user/verify",Payment.verifyPayment);

module.exports=router;