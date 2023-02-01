"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = __importDefault(require("../models/users.model"));
const authMiddleware = (...areas) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = config_1.SECRET_KEY;
            const verificationResponse = (0, jsonwebtoken_1.verify)(Authorization, secretKey);
            const userId = verificationResponse._id;
            const findUser = yield users_model_1.default.findById(userId);
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
});
exports.default = authMiddleware;
function authorized(allowedRoles, findUser) {
    if (allowedRoles.length) {
        return allowedRoles.includes(findUser.role);
    }
    return true;
}
