var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;

var { patientQuery, patientMutation } = require("./patientSchemas.js");
var { nurseQuery, nurseMutation } = require("./nurseSchemas.js");
var { healthQuery, healthMutation } = require("./healthSchemas.js");
var { emergencyQuery, emergencyMutation } = require("./emergencySchemas.js");
var { tipQuery, tipMutation } = require("./tipSchemas.js");
var { symptomQuery, symptomMutation } = require("./symptomSchemas.js");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      ...patientQuery,
      ...nurseQuery,
      ...healthQuery,
      ...emergencyQuery,
      ...tipQuery,
      ...symptomQuery,
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      ...patientMutation,
      ...nurseMutation,
      ...healthMutation,
      ...emergencyMutation,
      ...tipMutation,
      ...symptomMutation,
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
