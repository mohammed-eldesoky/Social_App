"use strict";
// post query
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const graphql_1 = require("graphql");
const post_type_1 = require("./post-type");
const post_service_graph_1 = require("./post.service-graph");
exports.postQuery = {
    getPost: {
        type: post_type_1.postType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve: post_service_graph_1.getSpecificPost
    }
    //getPosts: {},//
};
