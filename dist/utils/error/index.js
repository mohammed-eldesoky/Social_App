"use strict";
// CUSTOM ERROR CLASS
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.NotAuthorizedException = exports.NotFoundException = exports.ConflictException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
// custom error classes
class ConflictException extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.NotFoundException = NotFoundException;
class NotAuthorizedException extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
class BadRequestException extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.BadRequestException = BadRequestException;
