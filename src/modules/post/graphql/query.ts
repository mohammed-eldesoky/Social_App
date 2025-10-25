// post query

import { GraphQLID, GraphQLObjectType } from "graphql";
import { postResponseType, postType } from "./post-type";
import { getSpecificPost } from "./post.service-graph";

export const postQuery = {
  getPost: {
    type:postResponseType ,
    args: {
      id: { type: GraphQLID },
    },
    resolve: getSpecificPost
}
  //getPosts: {},//
  

}