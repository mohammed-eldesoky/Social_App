"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const modules_1 = require("./modules");
const connection_1 = require("./DB/connection");
function bootstrap(app, express) {
    //parsing data
    app.use(express.json());
    //auth
    app.use("/auth", modules_1.authRouter);
    //users
    //posts
    //comments  
    //messages
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "invalid roueter", success: false });
    });
    (0, connection_1.connectDB)(); //operation buffering
}
