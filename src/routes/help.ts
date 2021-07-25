import { createHelp, getHelps } from '../controllers/help';

module.exports = ([
  {
    path: '/api/helps',
    method: 'post',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => createHelp(req, res, next),
  },
  {
    path: '/api/helps',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getHelps(req, res, next),
  },
]);
