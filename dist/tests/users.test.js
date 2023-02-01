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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const users_route_1 = __importDefault(require("../routes/users.route"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(() => resolve(), 500));
}));
describe('Testing Users', () => {
    describe('[GET] /users', () => {
        it('response fineAll Users', () => __awaiter(void 0, void 0, void 0, function* () {
            const usersRoute = new users_route_1.default();
            const users = usersRoute.usersController.userService.users;
            users.find = jest.fn().mockReturnValue([
                {
                    _id: 'qpwoeiruty',
                    email: 'a../email.com',
                    password: yield bcrypt_1.default.hash('q1w2e3r4!', 10),
                },
                {
                    _id: 'alskdjfhg',
                    email: 'b../email.com',
                    password: yield bcrypt_1.default.hash('a1s2d3f4!', 10),
                },
                {
                    _id: 'zmxncbv',
                    email: 'c../email.com',
                    password: yield bcrypt_1.default.hash('z1x2c3v4!', 10),
                },
            ]);
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).get(`${usersRoute.path}`).expect(200);
        }));
    });
    describe('[GET] /users/:id', () => {
        it('response findOne User', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = 'qpwoeiruty';
            const usersRoute = new users_route_1.default();
            const users = usersRoute.usersController.userService.users;
            users.findOne = jest.fn().mockReturnValue({
                _id: 'qpwoeiruty',
                email: 'a../email.com',
                password: yield bcrypt_1.default.hash('q1w2e3r4!', 10),
            });
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
        }));
    });
    describe('[POST] /users', () => {
        it('response Create User', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                email: 'test../email.com',
                password: 'q1w2e3r4',
            };
            const usersRoute = new users_route_1.default();
            const users = usersRoute.usersController.userService.users;
            users.findOne = jest.fn().mockReturnValue(null);
            users.create = jest.fn().mockReturnValue({
                _id: '60706478aad6c9ad19a31c84',
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
        }));
    });
    describe('[PUT] /users/:id', () => {
        it('response Update User', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = '60706478aad6c9ad19a31c84';
            const userData = {
                email: 'test../email.com',
                password: 'q1w2e3r4',
            };
            const usersRoute = new users_route_1.default();
            const users = usersRoute.usersController.userService.users;
            if (userData.email) {
                users.findOne = jest.fn().mockReturnValue({
                    _id: userId,
                    email: userData.email,
                    password: yield bcrypt_1.default.hash(userData.password, 10),
                });
            }
            users.findByIdAndUpdate = jest.fn().mockReturnValue({
                _id: userId,
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
        }));
    });
    describe('[DELETE] /users/:id', () => {
        it('response Delete User', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = '60706478aad6c9ad19a31c84';
            const usersRoute = new users_route_1.default();
            const users = usersRoute.usersController.userService.users;
            users.findByIdAndDelete = jest.fn().mockReturnValue({
                _id: '60706478aad6c9ad19a31c84',
                email: 'test../email.com',
                password: yield bcrypt_1.default.hash('q1w2e3r4!', 10),
            });
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
        }));
    });
});
