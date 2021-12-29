const Image = require("../models/Image.js");
const errorResponse = require("../response/error.js");

const ImageRepository = () => {
  const addImage = async (req, res) => {
    try {
      const { title, image, geolocation } = req.body;
      const newImage = new Image({
        title,
        image,
        eventId: req.params.id,
        userId: req.user._id,
        geolocation,
      });

      const createdImage = await newImage.save();
      return createdImage;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    addImage,
  };
};

module.exports = ImageRepository();
