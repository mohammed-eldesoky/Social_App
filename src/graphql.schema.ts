import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { postQuery } from "./modules/post/graphql/query";



let query = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
       ...postQuery 
    }
})
export const graphqlSchema = new GraphQLSchema({
    query,
})