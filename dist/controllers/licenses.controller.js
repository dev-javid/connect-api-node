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
const licenses_service_1 = __importDefault(require("../services/licenses.service"));
class LicensesController {
    constructor() {
        this.userService = new licenses_service_1.default();
        this.getLicenses = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findAllLicensesData = yield this.userService.findAllLicense();
                res.status(200).json({ data: findAllLicensesData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        });
        this.getLicenseByPhone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = req.params.phone;
                const findOneLicenseData = yield this.userService.findLicenseByPhone(phone);
                res.status(200).json({ data: findOneLicenseData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        });
        this.createTrailLicense = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const createLicenseData = yield this.userService.createTrailLicense(userData);
                res.status(201).json({ data: createLicenseData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateLicense = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userData = req.body;
                const updateLicenseData = yield this.userService.updateLicense(id, userData);
                res.status(200).json({ data: updateLicenseData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteLicense = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deleteLicenseData = yield this.userService.deleteLicense(id);
                res.status(200).json({ data: deleteLicenseData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = LicensesController;
