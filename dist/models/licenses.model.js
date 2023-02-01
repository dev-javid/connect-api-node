"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const licenseSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    activatedOn: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const licenseModel = (0, mongoose_1.model)('License', licenseSchema);
exports.default = licenseModel;
