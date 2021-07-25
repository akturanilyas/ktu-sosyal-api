import { getConnection, getManager } from 'typeorm';
import { Help } from '../entities/help';

export const getHelps = async (req, res, next) => {
  try {
    const help = await getManager()
      .createQueryBuilder(Help, 'helps').getMany();
    res.status(200).json(help);
  } catch (error) {
    next(error);
  }
};
export const createHelp = async (req, res, next) => {
  const { content, text } = req.body;
  try {
    const newHelp = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Help)
      .values({
        content,
        text,
      })
      .execute();
    res.status(201).json(newHelp);
  } catch (error) {
    next(error);
  }
};
