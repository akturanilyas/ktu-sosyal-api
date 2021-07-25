import { User } from '../entities/user';
import * as UserService from '../services/user';

export const getUsers = async (req, res, next) => {
  try {
    const user: User[] = await User.find({ relations: ['posts', 'posts.replies', 'groups'] });
    user.forEach((v) => { delete v.password; });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user: User = await User.findOne({ where: { id: userId },
      relations: ['posts', 'posts.replies', 'posts.group', 'groups', 'groups.posts'] });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { inputPassword, newPassword } = req.body;
    await UserService.changePassword(userId, inputPassword, newPassword);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user: User = await User.findOne({ where: { id: userId }, relations: ['posts'] });
    if (!user) { throw new Error('Post doesnt exist'); }
    await user.remove();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const myGroups = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user: User = await User.findOne({ where: { id: userId }, relations: ['groups'] });
    res.status(200).json(user.groups);
  } catch (error) {
    next(error);
  }
};
