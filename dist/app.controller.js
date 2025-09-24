"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const modules_1 = require("./modules");
const DB_1 = require("./DB");
function bootstrap(app, express) {
    //parsing data
    app.use(express.json());
    //auth
    app.use("/auth", modules_1.authRouter);
    //users
    app.use("/user", modules_1.userRouter);
    //posts
    app.use("/post", modules_1.postRouter);
    //comments  
    //messages
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
