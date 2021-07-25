import { Group } from '../entities/group';
import { Post } from '../entities/post';
import { User } from '../entities/user';
import { parseUserId } from '../helpers/parse-user-id';
import * as PostService from '../services/post';

export const getGroupPosts = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const data = await PostService.getGroupPosts(groupId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await PostService.getUserPosts(userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const data = await PostService.getPost(postId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const createGroupPost = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    let post = await Post.create({ content: req.body.content });
    post = await post.save();

    const userIdFromGroup = parseUserId(req, res);
    const group = await Group.findOne({ where: { id: groupId }, relations: ['posts'] });
    const user = await User.findOne({ where: { id: userIdFromGroup }, relations: ['posts'] });
    group.posts.push(post);
    user.posts.push(post);

    await group.save();
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const createUserPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let post = await Post.create({ content: req.body.content });
    post = await post.save();
    const user = await User.findOne({ where: { id: userId }, relations: ['posts'] });
    user.posts.push(post);
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post: Post = await Post.findOne({ where: { id: postId }, relations: ['replies'] });
    if (!post) { throw new Error('post List doesnt exist'); }
    post.content = req.body.content;
    await post.save();
    res.status(204).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post: Post = await Post.findOne({ where: { id: postId }, relations: ['replies'] });
    if (!post) { throw new Error('post List doesnt exist'); }
    await post.remove();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
