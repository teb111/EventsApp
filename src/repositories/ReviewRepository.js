const Review = require("../models/Review");

const ReviewRepository = () => {
  const addReview = async (data) => {
    try {
      const { comment, rating } = data;
      const review = new Review({
        comment,
        imageId: data.imageId,
        userId: data.userId,
        rating: Number(rating),
        eventId: data.eventId,
      });

      const newReview = await review.save();
      return newReview;
    } catch (error) {
      throw (error);
    }
  };

  const getImageReviews = async (data) => {
    let review = [];
    try {
      const getReviews = await Review.find({
        eventId: data.eventId,
        imageId: data.imageId,
      });
      if (getReviews.length > 1) {
        review.push(...getReviews);
      } else {
        return getReviews;
      }
      return review;
    } catch (error) {
      throw (error);
    }
  };



  return {
    addReview,
    getImageReviews,

  };
};

module.exports = ReviewRepository();
