import { User } from '../entities/user';

export const getUserByEmail = async (email) => { return await User.findOne({ where: { email } }); };

export const getUserByRelation = async (id, relations) => { return await User.findOne(id, { relations }); };

export const getUserById = async (id) => { return await User.findOne(id); };

export const saveUser = async (user) => { return await User.save(user); };

export const updateUserById = async (id, updateData) => { return await User.update(id, updateData); };
