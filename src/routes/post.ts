import {
  createGroupPost, createUserPost, deletePost, getGroupPosts, getPost,
  getUserPosts, updatePost,
} from '../controllers/post';

module.exports = ([
  {
    path: '/api/users/:userId/posts',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getUserPosts(req, res, next),
  },
  {
    path: '/api/groups/:groupId/posts',
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getGroupPosts(req, res, next),
  },
  {
    path: '/api/users/:userId/posts',
    method: 'post',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => createUserPost(req, res, next),
  },
  {
    path: '/api/groups/:groupId/posts',
    method: 'post',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => createGroupPost(req, res, next),
  },
  {
    path: ['/api/users/:userId/posts/:postId', '/api/groups/:groupId/posts/:postId'],
    method: 'get',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => getPost(req, res, next),
  },
  {
    path: ['/api/users/:userId/posts/:postId', '/api/groups/:groupId/posts/:postId'],
    method: 'delete',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => deletePost(req, res, next),
  },
  {
    path: ['/api/users/:userId/posts/:postId', '/api/groups/:groupId/posts/:postId'],
    method: 'put',
    middlewares: [
      'token-checker',
    ],
    handler: (req, res, next) => updatePost(req, res, next),
  },
]);
