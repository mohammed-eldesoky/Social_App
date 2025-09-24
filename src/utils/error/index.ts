// CUSTOM ERROR CLASS

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorDettails?: Record<string, any>[]
    // public errorDettails?: Record<string, Any>[]
  ) {
    super(message);
  }
}

// custom error classes

export class ConflictException extends AppError {
  constructor(message: string,errorDettails?: Record<string, any>[]) {
    super(message, 409,errorDettails);
  }
}

export class NotFoundException extends AppError {
  constructor(message: string , errorDettails?: Record<string, any>[]) {
    super(message, 404,errorDettails);
  }
}

//_________________ not allowed  ____________________
export class UnAuthorizedException extends AppError {
  constructor(message: string , errorDettails?: Record<string, any>[]) {
    super(message, 401  ,errorDettails);
  }
}

export class BadRequestException extends AppError {
  constructor(message: string, errorDettails?: Record<string, any>[]) {
    super(message, 400),errorDettails;
  }
}

//___________________invalid credentials________________
export class ForbiddentException extends AppError {
  constructor(message: string, errorDettails?: Record<string, any>[]) {
    super(message, 403),errorDettails;
  }
}