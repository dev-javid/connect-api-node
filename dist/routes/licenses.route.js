"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const licenses_controller_1 = __importDefault(require("../controllers/licenses.controller"));
const licenses_dto_1 = require("../dtos/licenses.dto");
class LicensesRoute {
    constructor() {
        this.path = '/licenses';
        this.router = (0, express_1.Router)();
        this.controller = new licenses_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)('admin'), this.controller.getLicenses);
        this.router.get(`${this.path}/:phone`, (0, auth_middleware_1.default)('admin', 'app'), this.controller.getLicenseByPhone);
        this.router.post(`${this.path}/trial`, (0, auth_middleware_1.default)('admin', 'app'), (0, validation_middleware_1.default)(licenses_dto_1.CreateLicenseDto, 'body'), this.controller.createTrailLicense);
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)('admin'), (0, validation_middleware_1.default)(licenses_dto_1.UpdateLicenseDto, 'body'), this.controller.updateLicense);
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)('admin'), this.controller.deleteLicense);
    }
}
exports.default = LicensesRoute;
