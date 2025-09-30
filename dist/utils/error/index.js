"use strict";
// CUSTOM ERROR CLASS
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddentException = exports.BadRequestException = exports.UnAuthorizedException = exports.NotFoundException = exports.ConflictException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errorDettails;
    constructor(message, statusCode, errorDettails
    // public errorDettails?: Record<string, Any>[]
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorDettails = errorDettails;
    }
}
exports.AppError = AppError;
// custom error classes
class ConflictException extends AppError {
    constructor(message, errorDettails) {
        super(message, 409, errorDettails);
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends AppError {
    constructor(message, errorDettails) {
        super(message, 404, errorDettails);
    }
}
exports.NotFoundException = NotFoundException;
//_________________ not allowed  ____________________
class UnAuthorizedException extends AppError {
    constructor(message, errorDettails) {
        super(message, 401, errorDettails);
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
class BadRequestException extends AppError {
    constructor(message, errorDettails) {
        super(message, 400, errorDettails);
    }
}
exports.BadRequestException = BadRequestException;
//___________________invalid credentials________________
class ForbiddentException extends AppError {
    constructor(message, errorDettails) {
        super(message, 403, errorDettails);
    }
}
exports.ForbiddentException = ForbiddentException;
