import { compare, genSalt, hash } from 'bcrypt';
import { BadRequest, Unauthorized } from '@curveball/http-errors';
import * as jwt from 'jsonwebtoken';
import * as UserDataAccess from '../data-accesses/user';
import { User } from '../entities/user';

export const loginUser = async (email, password) => {
  const user: User = await UserDataAccess.getUserByEmail(email);
  if (!user) throw new BadRequest('Kullanici bulunamadi');

  const validPass = await compare(password, user.password);
  if (!validPass) throw new Unauthorized('Şifre veya E-mail yanlış');

  const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT);
  return token;
};

export const registerUser = async (user) => {
  const userWithEmail: User = await UserDataAccess.getUserByEmail(user.email);
  if (userWithEmail) throw new BadRequest('Bu kullanici zaten var');

  const salt = await genSalt(10);
  const hashedPassword = await hash(user.password, salt);
  const userTobeRegistered : User = { ...user, password: hashedPassword };
  const registeredUser: User = User.create(userTobeRegistered);
  await registeredUser.save();
};
