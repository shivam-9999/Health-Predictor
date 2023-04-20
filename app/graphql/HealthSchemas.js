const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const mongoose = require("mongoose");

const HealthModel = require("../models/HealthModel");

const healthType = new GraphQLObjectType({
  name: "HealthPatient",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      pulseRate: {
        type: GraphQLString,
      },
      bloodPressure: {
        type: GraphQLString,
      },
      weight: {
        type: GraphQLString,
      },
      temperature: {
        type: GraphQLString,
      },
      respiratoryRate: {
        type: GraphQLString,
      },
      commonSymptoms: {
        type: new GraphQLList(GraphQLString),
      },
      emergencyAlert: {
        type: GraphQLString,
      },
    };
  },
});

const queryType = {
  healths: {
    type: new GraphQLList(healthType),
    resolve: function () {
      const healths = HealthModel.find().exec();
      if (!healths) {
        throw new Error("Healths not found");
      }
      return healths;
    },
  },

  health: {
    type: healthType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const health = HealthModel.findById(params.id).exec();
      if (!health) {
        throw new Error("Health not found");
      }
      return health;
    },
  },
};

const Mutation = {
  createHealthPatient: {
    type: healthType,
    args: {
      pulseRate: {
        type: new GraphQLNonNull(GraphQLString),
      },
      bloodPressure: {
        type: new GraphQLNonNull(GraphQLString),
      },
      weight: {
        type: new GraphQLNonNull(GraphQLString),
      },
      temperature: {
        type: new GraphQLNonNull(GraphQLString),
      },
      respiratoryRate: {
        type: new GraphQLNonNull(GraphQLString),
      },
      commonSymptoms: {
        type: new GraphQLList(GraphQLString),
      },
      emergencyAlert: {
        type: GraphQLString,
      },
    },
    resolve: async function (root, params) {
      const healthModel = new HealthModel(params);

      const newHealth = await healthModel.save();
      if (!newHealth) {
        throw new Error("Could not save the health data!");
      }
      return newHealth;
    },
  },
};
module.exports = {
  healthQuery: queryType,
  healthMutation: Mutation,
};
