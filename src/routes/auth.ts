import { loginUser, registerUser } from '../controllers/auth';

module.exports = ([
  {
    path: '/api/auth/login',
    method: 'post',
    handler: (req, res, next) => loginUser(req, res, next),
  },
  {
    path: '/api/auth/register',
    method: 'post',
    handler: (req, res, next) => registerUser(req, res, next),
  },
]);
