const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error.errors) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        message: formattedErrors[0]?.message || 'Validation error',
        errors: formattedErrors,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Invalid request payload',
    });
  }
};

module.exports = validate;
