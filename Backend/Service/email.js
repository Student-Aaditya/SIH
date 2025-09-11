// Service/email.js
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to, 
    from: "aadityakuamr518@gmail.com", 
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(" Email sent successfully to:", to);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
