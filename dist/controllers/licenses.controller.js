"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const licenses_service_1 = tslib_1.__importDefault(require("../services/licenses.service"));
class LicensesController {
    constructor() {
        this.userService = new licenses_service_1.default();
        this.getLicenses = async (req, res, next) => {
            try {
                const findAllLicensesData = await this.userService.findAllLicense();
                res.status(200).json({ data: findAllLicensesData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getLicenseByPhone = async (req, res, next) => {
            try {
                const phone = req.params.phone;
                const findOneLicenseData = await this.userService.findLicenseByPhone(phone);
                res.status(200).json({ data: findOneLicenseData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createTrailLicense = async (req, res, next) => {
            try {
                const userData = req.body;
                const createLicenseData = await this.userService.createTrailLicense(userData);
                res.status(201).json({ data: createLicenseData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateLicense = async (req, res, next) => {
            try {
                const id = req.params.id;
                const userData = req.body;
                const updateLicenseData = await this.userService.updateLicense(id, userData);
                res.status(200).json({ data: updateLicenseData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteLicense = async (req, res, next) => {
            try {
                const id = req.params.id;
                const deleteLicenseData = await this.userService.deleteLicense(id);
                res.status(200).json({ data: deleteLicenseData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = LicensesController;
//# sourceMappingURL=licenses.controller.js.map