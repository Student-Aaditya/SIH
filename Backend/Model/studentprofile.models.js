const mongoose=require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  branch: String,
  yearOfAdmission: Number,
  interests: [String],
  profileImage: String, // cloud hashed link
  certificates: [String], // cloud hashed links
}, { timestamps: true });

const StudentProfile= mongoose.model("StudentProfile", studentProfileSchema);
module.exports=StudentProfile