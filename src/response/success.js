export const successResponse = (res, message, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    response: {
      statusCode,
      message,
    },
  });
};
