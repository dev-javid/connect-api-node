"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const users_controller_1 = tslib_1.__importDefault(require("../controllers/users.controller"));
const users_dto_1 = require("../dtos/users.dto");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("..//middlewares/auth.middleware"));
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new users_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)('manageUsers'), this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.default)('manageUsers'), this.usersController.getUserById);
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)('manageUsers'), (0, validation_middleware_1.default)(users_dto_1.CreateUserDto, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)('manageUsers'), (0, validation_middleware_1.default)(users_dto_1.UpdateUserDto, 'body', true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)('manageUsers'), this.usersController.deleteUser);
    }
}
exports.default = UsersRoute;
//# sourceMappingURL=users.route.js.map