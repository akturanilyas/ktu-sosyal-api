import { compare, genSalt, hash } from 'bcrypt';
import { BadRequest } from '@curveball/http-errors';
import { User } from '../entities/user';
import * as UserDataAccess from '../data-accesses/user';

export const changePassword = async (userId, inputPassword, newPassword) => {
  const user : User = await UserDataAccess.getUserById(userId);
  const validPass = await compare(inputPassword, user.password);
  const validPassNew = await compare(newPassword, user.password);
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);
  if (!validPass) throw new BadRequest('Mevcut şifreyi yanlış girdiniz');
  if (validPassNew) throw new BadRequest('Yeni şifre eskisiyle aynı olamaz');
  const newUser = { ...user, password: hashedPassword };

  await UserDataAccess.saveUser(newUser);
};
