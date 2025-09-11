const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    next(); // proceed if valid
  };
};

module.exports = validate;
