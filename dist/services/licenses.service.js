"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const licenses_model_1 = tslib_1.__importDefault(require("../models/licenses.model"));
const util_1 = require("../utils/util");
class LicenseService {
    constructor() {
        this.licenses = licenses_model_1.default;
    }
    async findAllLicense() {
        const licenses = await this.licenses.find();
        return licenses;
    }
    async findLicenseByPhone(phone) {
        if ((0, util_1.isEmpty)(phone))
            throw new HttpException_1.HttpException(400, 'LicenseId is empty');
        const findLicense = await this.licenses.findOne({ phone });
        if (!findLicense)
            throw new HttpException_1.HttpException(409, "License doesn't exist");
        return findLicense;
    }
    async createTrailLicense(licenseData) {
        if ((0, util_1.isEmpty)(licenseData))
            throw new HttpException_1.HttpException(400, 'licenseData is empty');
        const findLicense = await this.licenses.findOne({ phone: licenseData.phone });
        if (findLicense)
            throw new HttpException_1.HttpException(409, `This phone ${licenseData.phone} already license`);
        const createLicenseData = await this.licenses.create(Object.assign(Object.assign({}, licenseData), { status: 'trial' }));
        return createLicenseData;
    }
    async updateLicense(id, licenseData) {
        if ((0, util_1.isEmpty)(licenseData))
            throw new HttpException_1.HttpException(400, 'licenseData is empty');
        const findLicense = await this.licenses.findByIdAndUpdate(id);
        if (licenseData.status == 'activate') {
            findLicense.status = 'active';
            findLicense.activatedOn = new Date();
            const updateUserById = await this.licenses.findByIdAndUpdate(id, findLicense);
            if (!updateUserById)
                throw new HttpException_1.HttpException(409, "License doesn't exist");
            const updatedLicense = await this.licenses.findByIdAndUpdate(id);
            return updatedLicense;
        }
        return findLicense;
    }
    async deleteLicense(id) {
        const deleteLicenseById = await this.licenses.findOneAndDelete({ id });
        if (!deleteLicenseById)
            throw new HttpException_1.HttpException(409, "License doesn't exist");
        return deleteLicenseById;
    }
}
exports.default = LicenseService;
//# sourceMappingURL=licenses.service.js.map