const AnnouncementService = require('../services/announcement');

export const getAnnouncements = async (req, res, next) => {
  try {
    const data = await AnnouncementService.getAnnouncements();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
