// Handle errors
export const errorResponse = (res, message, statusCode = 500, error = {}) => {
  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
      error: error instanceof Error ? error.message : message,
    },
  });
};
