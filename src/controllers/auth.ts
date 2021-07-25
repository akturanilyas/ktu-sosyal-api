import * as AuthService from '../services/auth';

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.loginUser(email, password);
    res.header('auth-token', data).status(200).send({ token: data });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    await AuthService.registerUser(user);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};
