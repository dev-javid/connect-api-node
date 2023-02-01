"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.CreateUserDto = exports.LoginUserDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class LoginUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
exports.LoginUserDto = LoginUserDto;
class CreateUserDto extends LoginUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['admin', 'app']),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=users.dto.js.map