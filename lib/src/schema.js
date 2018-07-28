"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./resolvers");
const graphql_tools_1 = require("graphql-tools");
const fs = require("fs");
const path = require("path");
const schemaPath = path.join(__filename, "..", "api", "user.graphql");
const typeDefs = fs.readFileSync(schemaPath, "utf8");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers: resolvers_1.resolvers
});
//# sourceMappingURL=schema.js.map