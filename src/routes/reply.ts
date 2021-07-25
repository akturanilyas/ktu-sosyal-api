import { createReply, deleteReply, getReplies, getReply, updateReply } from '../controllers/reply';

module.exports = ([
  {
    path: '/api/groups/:groupId/posts/:postId/replies',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getReplies(req, res, next),
  },
  {
    path: '/api/groups/:groupId/posts/:postId/replies',
    method: 'post',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => createReply(req, res, next),
  },
  {
    path: '/api/users/:userId/posts/:postId/replies/:replyId',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getReply(req, res, next),
  },
  {
    path: '/api/users/:userId/posts/:postId/replies/:replyId',
    method: 'put',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => updateReply(req, res, next),
  },
  {
    path: '/api/users/:userId/posts/:postId/replies/:replyId',
    method: 'delete',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => deleteReply(req, res, next),
  },
]);
