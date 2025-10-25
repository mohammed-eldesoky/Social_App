"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const modules_1 = require("./modules");
const DB_1 = require("./DB");
const cors_1 = __importDefault(require("cors"));
const express_1 = require("graphql-http/lib/use/express");
const graphql_schema_1 = require("./graphql.schema");
function bootstrap(app, express) {
    //parsing data
    app.use(express.json());
    app.use((0, cors_1.default)({ origin: "*" }));
    //auth
    app.use("/auth", modules_1.authRouter);
    //users
    app.use("/user", modules_1.userRouter);
    //posts
    app.use("/post", modules_1.postRouter);
    //comments  
    app.use("/comment", modules_1.commentRouter);
    //chat
    app.use("/chat", modules_1.chatRouter);
    //requests
    app.use("/request", modules_1.requestRouter);
    //messages
    //graphql
    app.all("/graphql", (0, express_1.createHandler)({ schema: graphql_schema_1.graphqlSchema }));
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "invalid roueter", success: false });
    });
    (0, DB_1.connectDB)(); //operation buffering
    // GLOBAL ERROR HANDLER
    const globalErrorHandler = (error, req, res, next) => {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            success: false,
            errorDettails: error.errorDettails,
        });
    };
    app.use(globalErrorHandler);
}
