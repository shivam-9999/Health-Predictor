const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const mongoose = require("mongoose");

const HealthPatientModel = require("../models/HealthPatientModel");

const healthType = new GraphQLObjectType({
  name: "HealthPatient",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patientId: { type: GraphQLString },
      nurseId: { type: GraphQLString },
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
  healths_Patient: {
    type: new GraphQLList(healthType),
    resolve: function () {
      const healthsPatient = HealthPatientModel.find().exec();
      if (!healthsPatient) {
        throw new Error("HealthsPatient not found");
      }
      return healthsPatient;
    },
  },

  health_Patient: {
    type: healthType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const health = HealthPatientModel.findById(params.id).exec();
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
      patientId: {
        type: new GraphQLNonNull(GraphQLString),
      },
      nurseId: {
        type: new GraphQLNonNull(GraphQLString),
      },
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
      const healthPatientModel = new HealthPatientModel(params);
      const newHealth = await healthPatientModel.save();
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
