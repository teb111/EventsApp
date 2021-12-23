// Handle errors
const errorResponse = (res, error = {}, statusCode = 500) => {
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
