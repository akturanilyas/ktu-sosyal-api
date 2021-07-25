import * as GroupDataAccess from '../data-accesses/group';
import { Group } from '../entities/group';

export const leaveGroup = async (groupId, userId) => {
  const group : Group = await GroupDataAccess.getGroupByRelations(groupId, ['users', 'posts']);
  if (group?.users?.some((user) => user.id === userId)) {
    group.users = group.users.filter((user) => user.id !== userId);
  }
  if (group?.admins?.some((user) => user.id === userId)) {
    group.admins = group.admins.filter((user) => user.id !== userId);
  }
  if (!group?.users?.length) {
    group.posts.forEach((post) => post.remove());
    return await GroupDataAccess.removeGroup(group);
  }
  return await GroupDataAccess.saveGroup(group);
};
