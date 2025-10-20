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
    async blockUser(userId, targetId) {
        // 1-add targetId to blockedUsers
        await this.model.updateOne({ _id: userId }, { $addToSet: { blockedUsers: targetId } } // addToSet 
        );
        // delete targetId from friends
        await this.model.updateOne({ _id: userId }, { $pull: { friends: targetId } });
        await this.model.updateOne({ _id: targetId }, { $pull: { friends: userId } });
        return { message: "User blocked successfully" };
    }
}
exports.UserRepository = UserRepository;
