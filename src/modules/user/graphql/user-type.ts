import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const userType =new GraphQLObjectType({
            name: "User",
            fields: {
              _id: { type: GraphQLID },
              fullName: { type: GraphQLString },
              email: { type: GraphQLString },

              createdAt: { type: GraphQLString,resolve: (user) => user.createdAt.toISOString() },
              updatedAt: { type: GraphQLString ,resolve: (user) => user.updatedAt.toISOString() },
            },
          })
