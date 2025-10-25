// post query

import { GraphQLID } from "graphql";
import { postType } from "./post-type";
import { getSpecificPost } from "./post.service-graph";

export const postQuery = {
  getPost: {
    type: postType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: getSpecificPost
}
  //getPosts: {},//

}