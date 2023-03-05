"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_util_1 = require("../utils/logger.util");
const MONGO_URI = process.env.MONGO_URI;
// export async function conn() {
// 	let estbConn;
// 	if (!MONGO_URI) throw new Error("MONGO_URI missing!");
// 	if (estbConn) return estbConn;
// 	try {
// 		estbConn = await mongoose.set("strictQuery", true).connect(MONGO_URI);
// 		logger.info("Connection Successful!");
// 		logger.debug(`${estbConn}`);
// 		return true;
// 	} catch (error) {
// 		logger.error(`${error}`);
// 	}
// }
// logger.debug(MONGO_URI);
mongoose_1.default
    .set("strictQuery", true)
    .connect(MONGO_URI)
    .then(() => logger_util_1.logger.info("Connection Successful!"))
    .catch((e) => {
    logger_util_1.logger.error(`Err in connecting to db!:${e}`);
});
