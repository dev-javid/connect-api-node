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
const HttpException_1 = require("../exceptions/HttpException");
const licenses_model_1 = __importDefault(require("../models/licenses.model"));
const util_1 = require("../utils/util");
class LicenseService {
    constructor() {
        this.licenses = licenses_model_1.default;
    }
    findAllLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            const licenses = yield this.licenses.find();
            return licenses;
        });
    }
    findLicenseByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(phone))
                throw new HttpException_1.HttpException(400, 'LicenseId is empty');
            const findLicense = yield this.licenses.findOne({ phone });
            if (!findLicense)
                throw new HttpException_1.HttpException(409, "License doesn't exist");
            return findLicense;
        });
    }
    createTrailLicense(licenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(licenseData))
                throw new HttpException_1.HttpException(400, 'licenseData is empty');
            const findLicense = yield this.licenses.findOne({ phone: licenseData.phone });
            if (findLicense)
                throw new HttpException_1.HttpException(409, `This phone ${licenseData.phone} already license`);
            const createLicenseData = yield this.licenses.create(Object.assign(Object.assign({}, licenseData), { status: 'trial' }));
            return createLicenseData;
        });
    }
    updateLicense(id, licenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(licenseData))
                throw new HttpException_1.HttpException(400, 'licenseData is empty');
            const findLicense = yield this.licenses.findByIdAndUpdate(id);
            if (licenseData.status == 'activate') {
                findLicense.status = 'active';
                findLicense.activatedOn = new Date();
                const updateUserById = yield this.licenses.findByIdAndUpdate(id, findLicense);
                if (!updateUserById)
                    throw new HttpException_1.HttpException(409, "License doesn't exist");
                const updatedLicense = yield this.licenses.findByIdAndUpdate(id);
                return updatedLicense;
            }
            return findLicense;
        });
    }
    deleteLicense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteLicenseById = yield this.licenses.findOneAndDelete({ id });
            if (!deleteLicenseById)
                throw new HttpException_1.HttpException(409, "License doesn't exist");
            return deleteLicenseById;
        });
    }
}
exports.default = LicenseService;
