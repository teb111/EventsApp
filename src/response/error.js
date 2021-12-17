// Handle errors
const errorResponse = (res, message, statusCode = 500, error = {}) => {
  res.code(statusCode).send({
    success: false,
    error: {
      statusCode,
      message,
      error: error.message ?? message,
    },
  });
};

module.exports = errorResponse;
