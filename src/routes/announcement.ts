import { getAnnouncements } from '../controllers/announcement';

module.exports = ([
  {
    path: '/api/announcements',
    method: 'get',
    handler: (req, res, next) => getAnnouncements(req, res, next),
  },
]);
