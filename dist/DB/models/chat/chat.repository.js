"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const chat_model_1 = __importDefault(require("./chat.model"));
class ChatRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(chat_model_1.default);
    }
}
exports.ChatRepository = ChatRepository;
