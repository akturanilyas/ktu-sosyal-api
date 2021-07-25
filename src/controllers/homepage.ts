import { User } from '../entities/user';
import { Post } from '../entities/post';

export const getHomepage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user: User = await User.findOne({
      where: { id: userId },
      relations: ['groups', 'groups.posts', 'groups.posts.replies', 'groups.posts.group', 'groups.posts.user'],
    });
    const { groups } = user;
    const posts: Post[] = [];
    groups.forEach((group) => group.posts.forEach((groupPost) => posts.push(groupPost)));
    posts.sort((a, b) => {
      if (a.created > b.created) { return -1; }

      return 1;
    });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};
