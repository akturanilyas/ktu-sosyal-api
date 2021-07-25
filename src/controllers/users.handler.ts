import { dbConnect } from '../database';
import { User } from '../entities/User';

export const showAllUsers = async (req, res, next) => {
  try {
    const user: User[] = await User.find({ relations: ['posts', 'posts.replies', 'groups'] });
    user.forEach((v) => { delete v.password; });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const showOneUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user: User = await User.findOne({ where: { id: userId }, relations: ['posts', 'posts.replies', 'posts.group', 'groups', 'groups.posts'] });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user: User = await User.findOne({ where: { id: userId }, relations: ['posts', 'replies'] });
    if (!user) { throw new Error('User doesnt exist'); }
    user.name = req.body.name;
    await user.save();
    res.status(200).json(user);
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
