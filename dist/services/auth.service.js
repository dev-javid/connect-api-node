"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.users = users_model_1.default;
    }
    async signup(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'userData is empty');
        const findUser = await this.users.findOne({ email: userData.email });
        if (findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} already exists`);
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async login(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'userData is empty');
        const findUser = await this.users.findOne({ email: userData.email });
        if (!findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} was not found`);
        const isPasswordMatching = await (0, bcrypt_1.compare)(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(409, 'Password is not matching');
        const token = this.createToken(findUser);
        return { token };
    }
    async logout(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'userData is empty');
        const findUser = await this.users.findOne({ email: userData.email, password: userData.password });
        if (!findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} was not found`);
        return findUser;
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
//# sourceMappingURL=auth.service.js.map