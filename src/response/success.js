const successResponse = (res, message, statusCode = 200) => {
  res.code(statusCode).send({
    success: true,
    response: {
      statusCode,
      message,
    },
  });
};

module.exports = successResponse;
