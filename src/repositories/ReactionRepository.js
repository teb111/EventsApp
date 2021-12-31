const Reaction = require("../models/Reaction.js");
const errorResponse = require("../response/error.js");
const successResponse = require("../response/success.js");

const ReactionRepository = () => {
  const reactionAdd = async (req, res) => {
    try {
      const checkImageReaction = await Reaction.findOne({
        imageId: req.params.imageId,
        status: "active",
      });
      if (checkImageReaction) {
        if (typeof req.body !== null && req.body.hasOwnProperty("dislike")) {
          checkImageReaction.dislike = Number(checkImageReaction.dislike) + 1;
          const updatedReaction = await checkImageReaction.save();
          return successResponse(res, updatedReaction);
        } else if (
          typeof req.body !== null &&
          req.body.hasOwnProperty("like")
        ) {
          checkImageReaction.like = Number(checkImageReaction.like) + 1;
          const updatedReaction = await checkImageReaction.save();
          return successResponse(res, updatedReaction);
        } else {
          return successResponse(res, checkImageReaction);
        }
      } else {
        if (typeof req.body !== null && req.body.hasOwnProperty("dislike")) {
          const reactImage = new Reaction({
            imageId: req.params.imageId,
            dislike: 1,
            like: 0,
          });

          const newReaction = await reactImage.save();
          return successResponse(res, newReaction);
        } else if (
          typeof req.body !== null &&
          req.body.hasOwnProperty("like")
        ) {
          const reactImage = new Reaction({
            imageId: req.params.imageId,
            like: 1,
            dislike: 0,
          });

          const newReaction = await reactImage.save();
          return successResponse(res, newReaction);
        } else {
          return successResponse(res, checkImageReaction);
        }
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    reactionAdd,
  };
};

module.exports = ReactionRepository();
