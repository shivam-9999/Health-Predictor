var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;

var { patientQuery, patientMutation } = require("./patientSchemas.js.js");

var { healthQuery, healthMutation } = require("./HealthPatient.js");
var {
  motivationalVideoQuery,
  motivationalVideoMutation,
} = require("./motivationalGraphQLSchema.js");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      ...patientQuery,
      ...healthQuery,
      ...motivationalVideoQuery,
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      ...patientMutation,
      ...healthMutation,
      ...motivationalVideoMutation,
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
