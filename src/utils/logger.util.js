"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logger = {
    info: (logText) => {
        console.log(`${new Date()} ${chalk_1.default.green("Info")} :::: ${logText}`);
    },
    debug: (logText) => {
        console.log(`${new Date()} ${chalk_1.default.yellow("Debug")} :::: ${logText}`);
    },
    error: (logText) => {
        console.log(`${new Date()} ${chalk_1.default.red("Error")} :::: ${logText}`);
    },
};
exports.logger = logger;
