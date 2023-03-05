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
exports.userRoute = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const user_model_1 = require("../../models/user.model");
const logger_util_1 = require("../../utils/logger.util");
const aws_config_1 = require("../../configs/aws.config");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const userRoute = (0, express_1.Router)();
exports.userRoute = userRoute;
userRoute.use(auth_middleware_1.authMiddleware);
// To get user details
userRoute.get("/user/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params._id)
            throw new Error("user id not found in the request data!");
        const user = yield user_model_1.User.findById(req.params._id);
        if (!user)
            throw new Error("User not found!");
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in getting user info user: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}));
// To create User
// userRoute.post(
// 	"/user/create",
// 	multer().single("profileImg"),
// 	async (req: Request<{}, {}, { user: IUser }, {}>, res) => {
// 		try {
// 			const user_aws_uid = v4();
// 			let userData = req.body.user;
// 			if (req.file) {
// 				const url = await uploadImage(
// 					`user/${user_aws_uid}/${req.file.fieldname}${path.extname(
// 						req.file.originalname
// 					)}`,
// 					req.file.buffer
// 				);
// 				userData.profileImg = url as string;
// 				userData.awsID = user_aws_uid;
// 			}
// 			const user = new User(userData);
// 			const result = await user.save();
// 			res.status(201).json({ success: true, data: result });
// 		} catch (error) {
// 			logger.error(`Error in creating user: ${error}`);
// 			res.status(400).json({ success: false, message: `${error}` });
// 		}
// 	}
// );
// To update user details
userRoute.patch("/user/update", (0, multer_1.default)().single("profileImg"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updatedData, _id, aws_uid } = req.body;
        if (req.file) {
            const url = yield (0, aws_config_1.uploadImage)(`user/${aws_uid}/${req.file.fieldname}${path_1.default.extname(req.file.filename)}`, req.file.buffer);
            updatedData.profileImg = url;
        }
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(_id, updatedData, {
            new: true,
        });
        res.status(200).json({
            success: true,
            data: updatedUser,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in updating user: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}));
