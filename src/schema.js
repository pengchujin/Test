"use strict";
exports.__esModule = true;
var resolvers_1 = require("./resolvers");
var graphql_tools_1 = require("graphql-tools");
var fs = require("fs");
var path = require("path");
var schemaPath = path.join(__filename, "..", "api", "user.graphql");
var typeDefs = fs.readFileSync(schemaPath, "utf8");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers_1.resolvers
});
