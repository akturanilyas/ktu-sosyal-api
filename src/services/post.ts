import { Group } from '../entities/group';
import * as GroupDataAccess from '../data-accesses/group';
import * as UserDataAccess from '../data-accesses/user';
import * as PostDataAccess from '../data-accesses/post';
import { User } from '../entities/user';
import { Post } from '../entities/post';

export const getGroupPosts = async (id) => {
  const group: Group = await GroupDataAccess.getGroupByRelations(id, ['posts.replies', 'posts', 'posts.user']);
  group.posts.sort((a, b) => {
    if (a.created > b.created) { return -1; }

    return 1;
  });
  return group.posts;
};

export const getUserPosts = async (id) => {
  const user: User = await UserDataAccess.getUserByRelation(id,
    ['posts.replies', 'posts', 'posts.user', 'posts.group']);
  user.posts.sort((a, b) => {
    if (a.created > b.created) { return -1; }

    return 1;
  });
  return user.posts;
};

export const getPost = async (id) => {
  const post : Post = await PostDataAccess.getPostByRelations(id, ['replies']);
  return post;
};
