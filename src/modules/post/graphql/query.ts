// post query

import { GraphQLID, GraphQLObjectType } from "graphql";
import { postResponseType, postsResponseType, postType } from "./post-type";
import { getAllposts, getSpecificPost } from "./post.service-graph";

export const postQuery = {
  getPost: {
    type:postResponseType ,
    args: {
      id: { type: GraphQLID },
    },
    resolve: getSpecificPost
},
  //getPosts: {},//
  getPosts: {
    type:postsResponseType,
    resolve:getAllposts
    
  }

}