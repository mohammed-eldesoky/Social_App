"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const user_model_1 = __importDefault(require("./user.model"));
class UserRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(user_model_1.default);
    }
    async getAllUsers() {
        return await this.model.find();
    }
}
exports.UserRepository = UserRepository;
