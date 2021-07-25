import { Post } from '../entities/post';

export const getPostByRelations = async (id, relations) => { return await Post.findOne(id, { relations }); };
