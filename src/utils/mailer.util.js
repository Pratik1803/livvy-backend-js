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
exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_util_1 = require("./logger.util");
function mailer({ userEmail, action, otp, encryptedUserEmail }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
                },
            });
            if (action === "RECOVERY") {
                // To send recovery email
                let info = yield transporter.sendMail({
                    from: '"lIVVY" <livvy.admin@gmail.com>',
                    to: userEmail,
                    subject: "Reset password request...",
                    text: "Click the below link to reset your password.",
                    html: `<a href='www.livvy.in/recovery/email?Q=${encryptedUserEmail}' target='__blank'>Click here to reset password</a>`, // TODO: Include encrypted userID of user in the redirection link.
                });
                logger_util_1.logger.info(`Reset email sent to user ${userEmail}: ${info}`);
                return {
                    success: true,
                    data: info,
                };
            }
            else {
                // To send verification OTP
                let info = yield transporter.sendMail({
                    from: '"lIVVY" <livvy.admin@gmail.com>',
                    to: userEmail,
                    subject: "Verification OTP!",
                    text: "Given below is your OTP",
                    html: `${otp}`,
                });
                logger_util_1.logger.info(`OTP sent to user ${userEmail}: ${info}`);
                return {
                    success: true,
                    data: info,
                };
            }
        }
        catch (error) {
            logger_util_1.logger.error(`Error in mailer.util :${error}`);
            return {
                success: false,
                message: error,
            };
        }
    });
}
exports.mailer = mailer;
