import { Group } from '../entities/group';

export const getGroupByRelations = async (id, relations) => { return await Group.findOne(id, { relations }); };

export const removeGroup = async (group: Group) => { return await group.remove(); };

export const saveGroup = async (group: Group) => { return await group.save(); };
