import {
  createGroup, deleteGroup, getGroups, joinGroup, getGroup, leaveGroup,
} from '../controllers/group';

module.exports = ([
  {
    path: '/api/groups',
    method: 'post',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => createGroup(req, res, next),
  },
  {
    path: '/api/groups',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getGroups(req, res, next),
  },
  {
    path: '/api/groups/:groupId/join',
    method: 'post',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => joinGroup(req, res, next),
  },
  {
    path: '/api/groups/:groupId',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getGroup(req, res, next),
  },
  {
    path: '/api/groups/:groupId',
    method: 'delete',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => deleteGroup(req, res, next),
  },
  {
    path: '/api/groups/:groupId/leave',
    method: 'put',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => leaveGroup(req, res, next),
  },
]);
