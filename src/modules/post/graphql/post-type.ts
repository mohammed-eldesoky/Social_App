import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql"
import { userType } from "../../user/graphql/user-type"


export const postType = new GraphQLObjectType({
      name: "Post",
      fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        userId: {
          type: userType
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
      },
    })