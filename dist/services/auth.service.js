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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.users = users_model_1.default;
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, 'userData is empty');
            const findUser = yield this.users.findOne({ email: userData.email });
            if (findUser)
                throw new HttpException_1.HttpException(409, `This email ${userData.email} already exists`);
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            const createUserData = yield this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return createUserData;
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, 'userData is empty');
            const findUser = yield this.users.findOne({ email: userData.email });
            if (!findUser)
                throw new HttpException_1.HttpException(409, `This email ${userData.email} was not found`);
            const isPasswordMatching = yield (0, bcrypt_1.compare)(userData.password, findUser.password);
            if (!isPasswordMatching)
                throw new HttpException_1.HttpException(409, 'Password is not matching');
            const token = this.createToken(findUser);
            return { token };
        });
    }
    logout(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, 'userData is empty');
            const findUser = yield this.users.findOne({ email: userData.email, password: userData.password });
            if (!findUser)
                throw new HttpException_1.HttpException(409, `This email ${userData.email} was not found`);
            return findUser;
        });
    }
    createToken(user) {
        const dataStoredInToken = { _id: user._id };
        const secretKey = config_1.SECRET_KEY;
        const minutes = Number(config_1.TOKEN_LIFETIME_IN_MINUTES);
        const expiresIn = minutes * 60;
        const token = (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn });
        return { expiresIn, token };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
