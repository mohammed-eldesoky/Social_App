import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { userType } from "../../user/graphql/user-type"


export const postType = new GraphQLObjectType({
      name: "Post",
      fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        userId: {
          type: userType
        },
        createdAt: { type: GraphQLString ,resolve: (post) => post.createdAt.toISOString()},
        updatedAt: { type: GraphQLString ,resolve: (post) => post.updatedAt.toISOString() },
      },
    })

    //________________postResponse______

    export const postResponseType =new GraphQLObjectType ({
        name: "GetPost",
        fields: {
            message: { type: GraphQLString },
            success: { type: GraphQLBoolean },
            data: { type: postType }
        }
    })


    //___________________postsResponse____

    export const postsResponseType =new GraphQLObjectType ({
            name: "GetPosts",
            fields: {
                message: { type: GraphQLString },
                success: { type: GraphQLBoolean },
                data: { type: new GraphQLList(postType)}
            }
        })