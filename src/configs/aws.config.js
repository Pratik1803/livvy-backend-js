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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjects = exports.uploadImage = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_util_1 = require("../utils/logger.util");
const s3 = new aws_sdk_1.S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});
const uploadImage = (path, buffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: path,
            Body: buffer,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, function (s3Err, data) {
                if (s3Err)
                    reject(s3Err);
                logger_util_1.logger.info(`File uploaded successfully at ${data.Location}`);
                resolve(data.Location);
            });
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Err in uploading image: ${error}`);
    }
});
exports.uploadImage = uploadImage;
const deleteObjects = (objArr) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Objects = [];
        objArr === null || objArr === void 0 ? void 0 : objArr.map((obj, index) => {
            Objects.push({
                Key: decodeURI(obj.slice(42)),
            });
        });
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects,
            },
        };
        return new Promise((resolve, reject) => {
            // if (!objArr || objArr.length == 0) reject({ success: true });
            s3.deleteObjects(params, function (S3Err, data) {
                if (S3Err) {
                    reject({
                        success: false,
                        message: `${S3Err}`,
                    });
                }
                resolve({
                    success: true,
                    data,
                });
            });
        });
    }
    catch (e) {
        logger_util_1.logger.error(`Err in deleteing objects from e#: ${e}`);
    }
});
exports.deleteObjects = deleteObjects;
