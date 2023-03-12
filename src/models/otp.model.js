"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Number,
        required: true,
        trim: true,
        default: Number(Date.now()),
    },
    expiresAt: {
        type: Number,
        required: true,
        trim: true,
        default: Number(Date.now() + 3600000),
    },
    otp: {
        type: Number,
        required: true,
        trim: true,
    },
});
const Otp = mongoose_1.default.model("otp", otpSchema);
exports.Otp = Otp;
