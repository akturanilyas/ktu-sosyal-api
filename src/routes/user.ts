import {
  deleteUser, getUsers, getUser, myGroups, updateUserPassword,
} from '../controllers/user';
import { getHomepage } from '../controllers/homepage';

module.exports = ([
  {
    path: '/api/users',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getUsers(req, res, next),
  },
  {
    path: '/api/users/:userId/update-password',
    method: 'put',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => updateUserPassword(req, res, next),
  },
  {
    path: '/api/users/:userId',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getUser(req, res, next),
  },
  {
    path: '/api/users/:userId',
    method: 'delete',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => deleteUser(req, res, next),
  },
  {
    path: '/api/users/:userId/homepage',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getHomepage(req, res, next),
  },
  {
    path: '/api/users/:userId/mygroups',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => myGroups(req, res, next),
  },
]);
