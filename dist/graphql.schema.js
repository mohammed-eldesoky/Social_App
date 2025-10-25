"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSchema = void 0;
const graphql_1 = require("graphql");
const query_1 = require("./modules/post/graphql/query");
let query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        ...query_1.postQuery
    }
});
exports.graphqlSchema = new graphql_1.GraphQLSchema({
    query,
});
