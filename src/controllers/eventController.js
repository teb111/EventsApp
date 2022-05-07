const { PublicConstants } = require("../constants/constants");
const errorResponse = require("../response/error");
const ResponseMsg = require("../response/message");
const successResponse = require("../response/success");
const { isEmpty } = require("../utils/validator");

const eventController = (serviceContainer) => {
  const createEvent = async (req, res) => {
    try {
      if (typeof req.body !== null) {
        const { title, isPublic, geolocation, address, startTime, endTime } =
          req.body;
        const options = {
          title,
          isPublic,
          geolocation,
          address,
          startTime,
          endTime,
          userId: req.user._id,
        };
        if (
          isEmpty(title) ||
          isEmpty(isPublic) ||
          isEmpty(geolocation) ||
          isEmpty(address) ||
          isEmpty(startTime) ||
          isEmpty(endTime)
        ) {
          return errorResponse(res, ResponseMsg.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          if (isPublic === PublicConstants.PUBLIC_FALSE) {

            const data = {
              title,
              isPublic,
              geolocation,
              address,
              startTime,
              endTime,
              userId: req.user._id,


            };
            const result = await serviceContainer.eventService.newEvent(data);
            return successResponse(res, result);
          } else {
            const result = await serviceContainer.eventService.newEvent(
              options
            );
            return successResponse(res, result);
          }
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const joinEvent = async (req, res) => {
    try {
      if (typeof req.body !== null) {
        const options = { userId: req.user._id, eventId: req.params.id };
        if (req.body.hasOwnProperty("passcode")) {
          const { passcode } = req.body;
          const data = {
            passcode,
            userId: req.user._id,
            eventId: req.params.id,
          };
          if (isEmpty(passcode)) {
            return errorResponse(
              res,
              ResponseMsg.ERROR.ERROR_MISSING_FIELD,
              400
            );
          } else {
            const result = await serviceContainer.eventService.enterEvent(data);
            return successResponse(res, result);
          }
        } else {
          const result = await serviceContainer.eventService.enterEvent(
            options
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const addImage = async (req, res) => {
    try {
      if (typeof req.body !== null) {
        const { title, image, geolocation } = req.body;
        const data = {
          title,
          image,
          geolocation,
          userId: req.user._id,
          eventId: req.params.id,
        };
        if (isEmpty(title) || isEmpty(image) || isEmpty(geolocation)) {
          return errorResponse(res, ResponseMsg.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.eventService.postImage(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const commentImage = async (req, res) => {
    try {
      if (typeof req.body !== null) {
        const { comment, rating } = req.body;
        const data = {
          comment,
          rating,
          userId: req.user._id,
          eventId: req.params.id,
          imageId: req.params.imageId,
        };
        if (isEmpty(comment) || isEmpty(rating)) {
          return errorResponse(res, ResponseMsg.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.eventService.imageComment(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getImage = async (req, res) => {
    try {
      const data = {
        eventId: req.params.id,
        imageId: req.params.imageId,
        userId: req.user._id,
      };
      const result = await serviceContainer.eventService.imageFetch(data);
      return successResponse(res, result);
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getEvents = async (req, res) => {
    try {
      const result = await serviceContainer.eventService.eventFetch();
      return successResponse(res, result);
    } catch (error) {
      throw new Error(error);
    }
  };

  const addReaction = async (req, res) => {
    try {
      if (typeof req.body !== null) {
        if (req.body.hasOwnProperty("like")) {
          if (isEmpty(req.body.like)) {
            return errorResponse(
              res,
              ResponseMsg.ERROR.ERROR_MISSING_FIELD,
              400
            );
          }
          const data = {
            eventId: req.params.id,
            imageId: req.params.imageId,
            userId: req.user._id,
            like: req.body.like,
          };
          const result = await serviceContainer.eventService.imageReact(data);
          return successResponse(res, result);
        } else if (req.body.hasOwnProperty("dislike")) {
          if (isEmpty(req.body.dislike)) {
            return errorResponse(
              res,
              ResponseMsg.ERROR.ERROR_MISSING_FIELD,
              400
            );
          }
          const data = {
            eventId: req.params.id,
            imageId: req.params.imageId,
            userId: req.user._id,
            dislike: req.body.dislike,
          };
          const result = await serviceContainer.eventService.imageReact(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    createEvent,
    joinEvent,
    addImage,
    commentImage,
    getImage,
    getEvents,
    addReaction,
  };
};

module.exports = eventController;
