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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const index_route_1 = __importDefault(require("../routes/index.route"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(() => resolve(), 500));
}));
describe('Testing Index', () => {
    describe('[GET] /', () => {
        it('response statusCode 200', () => {
            const indexRoute = new index_route_1.default();
            const app = new app_1.default([indexRoute]);
            return (0, supertest_1.default)(app.getServer()).get(`${indexRoute.path}`).expect(200);
        });
    });
});
