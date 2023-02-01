"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLicenseDto = exports.CreateLicenseDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateLicenseDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateLicenseDto.prototype, "phone", void 0);
exports.CreateLicenseDto = CreateLicenseDto;
class UpdateLicenseDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['activate']),
    tslib_1.__metadata("design:type", String)
], UpdateLicenseDto.prototype, "status", void 0);
exports.UpdateLicenseDto = UpdateLicenseDto;
//# sourceMappingURL=licenses.dto.js.map