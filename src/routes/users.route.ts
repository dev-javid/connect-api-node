import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '..//middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware('admin'), this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware('admin'), this.usersController.getUserById);
    this.router.post(`${this.path}`, authMiddleware('admin'), validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(
      `${this.path}/:id`,
      authMiddleware('admin'),
      validationMiddleware(UpdateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware('admin'), this.usersController.deleteUser);
  }
}

export default UsersRoute;
