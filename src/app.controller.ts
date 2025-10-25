import type {
  Express,
  NextFunction,
  Response,
  Request,
  ErrorRequestHandler,
} from "express";
import {
  authRouter,
  chatRouter,
  commentRouter,
  postRouter,
  requestRouter,
  userRouter,
} from "./modules";
import { connectDB } from "./DB";
import { AppError } from "./utils";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { graphqlSchema } from "./graphql.schema";
import { GraphQLError } from "graphql";
export function bootstrap(app: Express, express: any) {
  //parsing data
  app.use(express.json());

  app.use(cors({ origin: "*" }));
  //auth
  app.use("/auth", authRouter);
  //users
  app.use("/user", userRouter);
  //posts
  app.use("/post", postRouter);
  //comments
  app.use("/comment", commentRouter);
  //chat
  app.use("/chat", chatRouter);
  //requests
  app.use("/request", requestRouter);
  //messages
  //graphql
  app.all(
    "/graphql",
    createHandler({
      schema: graphqlSchema,
      formatError: (error: GraphQLError) => {
        return {
          message: error.message,
          success: false,
          errorDettails: error.originalError,
          path: error.path,
        } as unknown as GraphQLError;
      },
    })
  );
  app.use("/{*dummy}", (req, res, next) => {
    return res.status(404).json({ message: "invalid roueter", success: false });
  });

  connectDB(); //operation buffering

  // GLOBAL ERROR HANDLER

  const globalErrorHandler: ErrorRequestHandler = (
    error: AppError,
    req: Express.Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: false,
      errorDettails: error.errorDettails,
    });
  };

  app.use(globalErrorHandler);
}
