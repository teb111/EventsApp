const Review = require("../models/Review");
const errorResponse = require("../response/error");

const ReviewRepository = () => {
  const addReview = async (req, res) => {
    try {
      const { comment, rating } = req.body;
      const review = new Review({
        comment,
        imageId: req.params.imageId,
        userId: req.user._id,
        rating: Number(rating),
        eventId: req.params.id,
      });

      const newReview = await review.save();
      return newReview;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getImageReviews = async (req, res) => {
    let review = [];
    try {
      const getReviews = await Review.find({
        eventId: req.params.id,
        imageId: req.params.imageId,
      });
      if (getReviews.length > 1) {
        review.push(...getReviews);
      } else {
        return getReviews;
      }
      return review;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    addReview,
    getImageReviews,
  };
};

module.exports = ReviewRepository();
