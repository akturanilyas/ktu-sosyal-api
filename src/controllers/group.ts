import { Group } from '../entities/group';
import { User } from '../entities/user';
import { parseUserId } from '../helpers/parse-user-id';
import * as GroupService from '../services/group';

export const createGroup = async (req, res, next) => {
  try {
    const { name, faculty } = req.body;

    const group = await Group.createQueryBuilder('group')
      .where('LOWER(group.name) = LOWER(:name)', { name })
      .getMany();

    if (group.length > 0) {
      res.status(400).send('Bu adda bir grup zaten var!');
    } else {
      let newGroup = await Group.create({ name: req.body.name, faculty: req.body.faculty });

      const userId = parseUserId(req, res);
      const user = await User.findOne({ where: { id: userId }, relations: ['groups'] });
      user.groups.push(newGroup);
      newGroup.admins = [user];

      newGroup = await newGroup.save();
      await user.save();

      res.status(201).json(newGroup.name);
    }
  } catch (error) {
    next(error);
  }
};

export const getGroups = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const user: User = await User.findOne({ where: { id: userId }, relations: ['groups'] });
      res.status(200).json(user.groups);
    } else {
      const group: Group[] = await Group.find({ relations: ['users', 'posts', 'posts.replies', 'posts.user', 'admins'] });
      res.status(200).json({ groups: group });
    }
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group: Group = await Group.findOne({ where: { id: groupId }, relations: ['users', 'posts', 'posts.replies', 'posts.user', 'admins', 'posts.group'] });
    group?.posts?.sort((a, b) => {
      if (a.created > b.created) { return -1; }

      return 1;
    });
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group: Group = await Group.findOne({ where: { id: groupId }, relations: ['admins'] });
    const { admins } = group;

    res.status(200).json(admins);
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = parseUserId(req, res);
    const group: Group = await Group.findOne({ where: { id: groupId }, relations: ['admins', 'posts'] });
    const { admins } = group;

    const userHasPrivileges: (user: User) => boolean = (user: User) => user.id === userId;
    if (admins.some(userHasPrivileges)) {
      await group.posts.forEach((post) => post.remove());
      await group.remove();
      res.status(200).json(group);
    } else {
      res.status(401).send({ message: 'Yeterli Yetki yok' });
    }
  } catch (error) {
    next(error);
  }
};

export const leaveGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = parseUserId(req, res);
    await GroupService.leaveGroup(groupId, userId);
    res.status(204).send({});
  } catch (error) {
    next(error);
  }
};

export const joinGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findOne({ where: { id: groupId } });

    const userId = parseUserId(req, res);
    const user = await User.findOne({ where: { id: userId }, relations: ['groups'] });
    const queryForGroupUsers = await Group.findOne({
      relations: ['users'],
      where: { id: groupId },
    });
    const groupUsers = queryForGroupUsers.users;
    let userExists = false;

    // check group's users if the user already exists, this probably should be done with a query, but I don't know SQL
    groupUsers.forEach((user) => {
      userExists = user.id == userId;
    });

    console.log('asd');

    if (!userExists) {
      user.groups.push(group);
      await user.save();
      res.status(200).send('User Joined!');
    } else {
      res.status(400).send('Something wrong');
    }
  } catch (error) {
    next(error);
  }
};
