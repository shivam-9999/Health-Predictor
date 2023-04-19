var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;

var { studentQuery, studentMutation } = require("./patientSchemas.js");

var { courseQuery, courseMutation } = require("./courseSchemas.js");
var { healthQuery, healthMutation } = require("./HealthSchemas.js");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      ...studentQuery,
      ...courseQuery,
      ...healthQuery,
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      ...studentMutation,
      ...courseMutation,
      ...healthMutation,
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
