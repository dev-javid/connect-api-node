"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedAresForRole = exports.roles = void 0;
const roleAreaMapping = {
    app: ['addTrialLicense', 'getLicense'],
    admin: ['manageUsers', 'manageLicenses'],
};
exports.roles = Object.keys(roleAreaMapping);
exports.allowedAresForRole = new Map(Object.entries(roleAreaMapping));
