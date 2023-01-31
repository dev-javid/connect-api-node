"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _authController = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/controllers/auth.controller"));
const _usersDto = require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/dtos/users.dto");
const _validationMiddleware = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/middlewares/validation.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthRoute = class AuthRoute {
    initializeRoutes() {
        this.router.post(`${this.path}login`, (0, _validationMiddleware.default)(_usersDto.LoginUserDto, 'body'), this.authController.logIn);
    }
    constructor(){
        this.path = '/auth';
        this.router = (0, _express.Router)();
        this.authController = new _authController.default();
        this.initializeRoutes();
    }
};
const _default = AuthRoute;

//# sourceMappingURL=auth.route.js.map