"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const authMiddleware = (...areas) => async (req, res, next) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = config_1.SECRET_KEY;
            const verificationResponse = (0, jsonwebtoken_1.verify)(Authorization, secretKey);
            const userId = verificationResponse._id;
            const findUser = await users_model_1.default.findById(userId);
            if (findUser) {
                if (authorized(areas, findUser)) {
                    req.user = findUser;
                    next();
                }
                else {
                    next(new HttpException_1.HttpException(401, 'Unauthorized user'));
                }
            }
            else {
                next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
function authorized(allowedRoles, findUser) {
    if (allowedRoles.length) {
        return allowedRoles.includes(findUser.role);
    }
    return true;
}
//# sourceMappingURL=auth.middleware.js.map