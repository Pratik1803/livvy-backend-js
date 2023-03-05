"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("./configs/conn.config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./routes/user/user.route");
const auth_route_1 = require("./routes/auth/auth.route");
const logger_util_1 = require("./utils/logger.util");
const product_route_1 = require("./routes/product/product.route");
const session_route_1 = require("./routes/session/session.route");
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)(), (0, cors_1.default)({ origin: "*" }), body_parser_1.default.json(), body_parser_1.default.urlencoded({ extended: true }), 
// Routes
auth_route_1.authRoute, user_route_1.userRoute, product_route_1.productRoute, session_route_1.sessionRoute);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from the backend!",
    });
});
app.listen(PORT, () => logger_util_1.logger.info(`Server listening on port ${PORT}...`));
