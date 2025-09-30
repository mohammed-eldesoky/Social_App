import authRouter from "./auth/auth.conroller";
import userRouter from "./user/user.controller";
import commentRouter from "./comment/comment.controller"; // Remember before postRouter
import postRouter from "./post/post.controller";

export { authRouter, userRouter, postRouter, commentRouter };
