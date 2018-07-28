"use strict";
exports.__esModule = true;
var graphql_1 = require("graphql");
function validationError(errors) {
    return new graphql_1.GraphQLError("无法处理请求!", undefined, undefined, undefined, undefined, undefined, { errorFields: errors });
}
exports.validationError = validationError;
