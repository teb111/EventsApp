const Image = require("../models/Image.js");

const ImageRepository = () => {
  const addImage = async (data) => {
    try {
      const { title, image, geolocation } = data;
      const newImage = new Image({
        title,
        image,
        eventId: data.eventId,
        userId: data.userId,
        geolocation,
      });

      const createdImage = await newImage.save();
      return createdImage;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    addImage,
  };
};

module.exports = ImageRepository();
