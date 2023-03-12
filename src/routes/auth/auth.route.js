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
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const user_model_1 = require("../../models/user.model");
const createRoom_util_1 = require("../../utils/createRoom.util");
const logger_util_1 = require("../../utils/logger.util");
const generateToken_util_1 = require("../../utils/generateToken.util");
const mailer_util_1 = require("../../utils/mailer.util");
const otp_model_1 = require("../../models/otp.model");
const authRoute = express_1.default.Router();
exports.authRoute = authRoute;
authRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password)
            throw new Error("Invalid credentials!");
        const user = yield user_model_1.User.findOne({ email: req.body.email });
        if (!user)
            throw new Error("User not found!");
        const passwordCheck = yield bcryptjs_1.default.compare(req.body.password, user.password);
        // logger.debug(`${passwordCheck} ${req.body.password} ${user.password}`);
        if (!passwordCheck)
            throw new Error("Incorrect password!");
        const token = (0, generateToken_util_1.generateToken)(user._id.toString());
        if (!token)
            throw new Error("Failed to generate token!");
        res.status(200).json({
            success: true,
            data: user,
            token,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in Logging In User: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
// To create user
authRoute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userData, otp } = req.body;
        userData.aws_uid = (0, uuid_1.v4)();
        if (!userData.username || !userData.email || !otp)
            throw new Error("Specified user details not received!");
        // OTP verification logic
        const otps = yield otp_model_1.Otp.find({
            email: userData.email,
            expiresAt: { $gte: Number(Date.now()) },
        });
        if (otps.length <= 0)
            throw new Error("No active otps available. Try requesting new one");
        const validAndMatchingOtps = otps.filter((otpDoc) => otpDoc.otp === otp);
        if (validAndMatchingOtps.length <= 0)
            throw new Error("Invalid otp!");
        // 100ms room creation logic
        const room_data = yield (0, createRoom_util_1.createRoom)({
            name: userData.username.replace(" ", ""),
            description: `Room for ${userData.username}`,
            region: "in",
            template_id: "63da65202c69be2b20650627",
        });
        userData.roomId = room_data.id;
        // User Document creating logic
        const user = new user_model_1.User(userData);
        const result = yield user.save();
        const token = (0, generateToken_util_1.generateToken)(result._id.toString());
        res.status(201).json({
            success: true,
            data: result,
            token,
        });
        // Delete the used otp
        const deletedOtpDoc = yield otp_model_1.Otp.deleteOne({ email: userData.email, otp });
        if (!deletedOtpDoc)
            throw new Error(`Failed to delete the otp: ${(userData.email, otp)}`);
        logger_util_1.logger.info(`Successfully created user and deleted OTP: ${(userData.email, otp)}`);
    }
    catch (error) {
        logger_util_1.logger.error(`Error in creating User: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
// To send the otp
authRoute.post("/verification/otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email)
            throw new Error("User-email required!");
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpDoc = new otp_model_1.Otp({ email: req.body.email, otp });
        const otpCreated = yield otpDoc.save();
        if (!otpCreated)
            throw new Error("Failed to create OTP!");
        const otpSent = yield (0, mailer_util_1.mailer)({
            userEmail: req.body.email,
            action: "OTP",
            otp,
        });
        if (!otpSent.success)
            throw new Error(`${otpSent.message}`);
        res.status(201).json({
            success: true,
            data: otpSent.data,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in sending verification otp: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
// To send recovery email
authRoute.post("/email-recovery", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email)
            throw new Error("Email not found!");
        const recoveryEmailSent = yield (0, mailer_util_1.mailer)({
            userEmail: req.body.email,
            action: "RECOVERY",
            encryptedUserId: "",
        });
        if (!recoveryEmailSent.success)
            throw new Error("Recovery Email not sent!");
        res.status(200).json({
            success: true,
            data: recoveryEmailSent.data,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in sending recovery email: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
// To reset password of user
authRoute.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body._id || !req.body.email || !req.body.newPassword)
            throw new Error("UserId, Email and NewPassword are required!");
        const newHashedPassword = yield bcryptjs_1.default.hash(req.body.newPassword, 10);
        const result = yield user_model_1.User.findByIdAndUpdate(req.body._id, { password: newHashedPassword }, { new: true });
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in resetting password: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
