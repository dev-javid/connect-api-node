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
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class UserService {
    constructor() {
        this.users = users_model_1.default;
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.users.find();
            return users;
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userId))
                throw new HttpException_1.HttpException(400, 'UserId is empty');
            const findUser = yield this.users.findOne({ _id: userId });
            if (!findUser)
                throw new HttpException_1.HttpException(409, "User doesn't exist");
            return findUser;
        });
    }
    createUser(userData) {
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
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, 'userData is empty');
            if (userData.password) {
                const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
                userData = Object.assign(Object.assign({}, userData), { password: hashedPassword });
            }
            const updateUserById = yield this.users.findByIdAndUpdate(userId, { userData });
            if (!updateUserById)
                throw new HttpException_1.HttpException(409, "User doesn't exist");
            return updateUserById;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUserById = yield this.users.findByIdAndDelete(userId);
            if (!deleteUserById)
                throw new HttpException_1.HttpException(409, "User doesn't exist");
            return deleteUserById;
        });
    }
}
exports.default = UserService;
