import { PostRepository } from "../../../DB";
import { NotFoundException } from "../../../utils";


export const getSpecificPost =async (parent, args) => {
      const postRepositoryost = new PostRepository();
      const post = await postRepositoryost.getOne(
        { _id: args.id },
        {},
        {
          populate: [{ path: "userId" }],
        }
      );
      //fail case
      if (!post) {
        throw new NotFoundException("post not found");
      }

      return {
        message:"done",
        success:true,
        data:post
      }; //{_id, content, ...}
    }
  