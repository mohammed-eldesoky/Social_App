import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
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

    //________________postResponse______

    export const postResponseType =new GraphQLObjectType ({
        name: "GetPost",
        fields: {
            message: { type: GraphQLID },
            success: { type: GraphQLID },
            data: { type: postType }
        }
    })


    //___________________postsResponse____

    export const postsResponseType =new GraphQLObjectType ({
            name: "GetPost",
            fields: {
                message: { type: GraphQLID },
                success: { type: GraphQLID },
                data: { type: new GraphQLList(postType)}
            }
        })