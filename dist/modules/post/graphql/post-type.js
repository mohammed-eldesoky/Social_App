"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postType = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("../../user/graphql/user-type");
exports.postType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        userId: {
            type: user_type_1.userType
        },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    },
});
