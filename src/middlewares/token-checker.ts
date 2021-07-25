import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

module.exports = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = <string>req.headers['auth-token'];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, process.env.SECRET_JWT);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send(JSON.stringify('unauthorized'));
    return;
  }

  const { id } = jwtPayload;
  const newToken = jwt.sign({ id }, process.env.SECRET_JWT, {
  });
  res.setHeader('token', newToken);

  next();
};
