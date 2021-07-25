import { Reply } from '../entities/reply';
import { Post } from '../entities/post';

export const getReplies = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const ReplyList = await Post.findOne({ where: { id: postId }, relations: ['replies'] });
    ReplyList.replies.sort((a, b) => {
      if (a.created < b.created) { return -1; }

      return 1;
    });
    res.json(ReplyList.replies);
  } catch (error) {
    next(error);
  }
};

export const createReply = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let reply = await Reply.create({ content: req.body.content, user_Id: req.body.user_Id });
    reply = await reply.save();

    const Posts = await Post.findOne({ where: { id: postId }, relations: ['replies'] });
    Posts.replies.push(reply);

    await Posts.save();
    res.json(reply);
  } catch (error) {
    next(error);
  }
};

export const getReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const reply: Reply = await Reply.findOne({ where: { id: replyId } });
    if (!Reply) { throw new Error('Reply not found!'); }
    res.json(reply);
  } catch (error) {
    next(error);
  }
};

export const updateReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const reply: Reply = await Reply.findOne({ where: { id: replyId } });
    reply.content = req.body.content;
    await reply.save();

    res.json(reply);
  } catch (error) {
    next(error);
  }
};

export const deleteReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const reply: Reply = await Reply.findOne({ where: { id: replyId } });

    reply.content = req.body.content;
    await reply.remove();
    res.json(reply);
  } catch (error) {
    next(error);
  }
};
