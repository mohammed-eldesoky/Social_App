
// CUSTOM ERROR CLASS

export class AppError extends Error{
constructor(message:string,public statusCode:number){
    super(message);
}
}

// custom error classes

    export class ConflictException extends AppError{
        constructor(message:string){
        super(message,409);
        }
    }

    export class NotFoundException extends AppError{
        constructor(message:string){
        super(message,409);
        }
    }

        export class NotAuthorizedException extends AppError{
        constructor(message:string){
        super(message,409);
        }
    }

        export class BadRequestException extends AppError{
        constructor(message:string){
        super(message,409);
        }
    }

