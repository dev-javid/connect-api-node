import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { HttpException } from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import userModel from '../models/users.model';
import { User } from '..//interfaces/users.interface';

const authMiddleware =
  (...areas: string[]) =>
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

      if (Authorization) {
        const secretKey: string = SECRET_KEY;
        const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
        const userId = verificationResponse._id;
        const findUser = await userModel.findById(userId);

        if (findUser) {
          if (authorized(areas, findUser)) {
            req.user = findUser;
            next();
          } else {
            next(new HttpException(401, 'Unauthorized user'));
          }
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };

export default authMiddleware;
function authorized(allowedRoles: string[], findUser: User) {
  if (allowedRoles.length) {
    return allowedRoles.includes(findUser.role);
  }
  return true;
}
