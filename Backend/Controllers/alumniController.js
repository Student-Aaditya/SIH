const Alumni = require("../Model/alumniData");

// Create new alumni
exports.createAlumni = async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.status(201).json({ success: true, message: "Alumni created", alumni });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all alumni
exports.getAllAlumni = async (req, res) => {
  try {
    const data = await Alumni.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get one alumni by userId
exports.getAlumniByUserId = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ userId: req.params.userId });
    if (!alumni) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, alumni });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update alumni
exports.updateAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    if (!alumni) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, message: "Updated", alumni });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete alumni
exports.deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findOneAndDelete({ userId: req.params.userId });
    if (!alumni) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
