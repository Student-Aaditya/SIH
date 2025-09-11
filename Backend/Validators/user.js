const Joi = require("joi");

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).messages({
    "string.base": "Username must be a string",
    "string.min": "Username should have at least 3 characters",
    "string.max": "Username should not exceed 30 characters",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("Alumini", "Admin", "Student").default("Student").messages({
    "any.only": "Role must be one of Alumini, Admin, or Student",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

module.exports = userValidationSchema;
