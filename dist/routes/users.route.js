"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _usersController = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/controllers/users.controller"));
const _usersDto = require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/dtos/users.dto");
const _validationMiddleware = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/middlewares/validation.middleware"));
const _authMiddleware = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/middlewares/auth.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UsersRoute = class UsersRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, _authMiddleware.default)('manageUsers'), this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, (0, _authMiddleware.default)('manageUsers'), this.usersController.getUserById);
        this.router.post(`${this.path}`, (0, _authMiddleware.default)('manageUsers'), (0, _validationMiddleware.default)(_usersDto.LoginUserDto, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id`, (0, _authMiddleware.default)('manageUsers'), (0, _validationMiddleware.default)(_usersDto.LoginUserDto, 'body', true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, (0, _authMiddleware.default)('manageUsers'), this.usersController.deleteUser);
    }
    constructor(){
        this.path = '/users';
        this.router = (0, _express.Router)();
        this.usersController = new _usersController.default();
        this.initializeRoutes();
    }
};
const _default = UsersRoute;

//# sourceMappingURL=users.route.js.map