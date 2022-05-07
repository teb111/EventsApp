const { StatusConstants } = require("../constants/constants.js");
const Reaction = require("../models/Reaction.js");

const ReactionRepository = () => {
  const reactionAdd = async (data) => {
    try {
      const checkImageReaction = await Reaction.findOne({
        imageId: data.imageId,
        status: StatusConstants.STATUS_ACTIVE,
      });
      if (checkImageReaction) {
        if (data.dislike) {
          checkImageReaction.dislike = Number(checkImageReaction.dislike) + 1;
          const updatedReaction = await checkImageReaction.save();
          return updatedReaction;
        } else if (data.like) {
          checkImageReaction.like = Number(checkImageReaction.like) + 1;
          const updatedReaction = await checkImageReaction.save();
          return updatedReaction;
        } else {
          return checkImageReaction;
        }
      } else {
        if (data.dislike) {
          const reactImage = new Reaction({
            imageId: data.imageId,
            dislike: 1,
            like: 0,
          });

          const newReaction = await reactImage.save();
          return newReaction;
        } else if (data.like) {
          const reactImage = new Reaction({
            imageId: req.params.imageId,
            like: 1,
            dislike: 0,
          });

          const newReaction = await reactImage.save();
          return newReaction;
        } else {
          return checkImageReaction;
        }
      }
    } catch (error) {
      throw (error);
    }
  };

  return {
    reactionAdd,
  };
};

module.exports = ReactionRepository();
