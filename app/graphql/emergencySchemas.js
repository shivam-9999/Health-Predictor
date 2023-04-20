const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;

const EmergencyModel = require("../models/emergencyModel");

const patientType = require("./patientSchemas").patientType;

const emergencyType = new GraphQLObjectType({
  name: "Emergency",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: patientType,
      },
      concern: {
        type: GraphQLString,
      },
      timestamp: {
        type: GraphQLString,
      },
    };
  },
});

const emergencyMutationType = new GraphQLObjectType({
  name: "EmergencyMutation",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: GraphQLString,
      },
      concern: {
        type: GraphQLString,
      },
      timestamp: {
        type: GraphQLString,
      },
    };
  },
});

const queryType = {
  emergencies: {
    type: new GraphQLList(emergencyType),
    resolve: function () {
      const emergencies = EmergencyModel
        .find()
        .populate("patient")
        .exec();
      if (!emergencies) {
        throw new Error("Emergencies not found");
      }
      return emergencies;
    },
  },

  emergenciesByPatient: {
    type: new GraphQLList(emergencyType),
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const emergencies = EmergencyModel
        .find({ patient: params.patient })
        .populate("patient")
        .exec();
      if (!emergencies) {
        throw new Error("Emergencies not found");
      }
      return emergencies;
    },
  },

  emergency: {
    type: emergencyType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const emergency = EmergencyModel
        .findById(params.id)
        .populate("patient")
        .exec();
      if (!emergency) {
        throw new Error("Emergency not found");
      }
      return emergency;
    },
  },
};

const Mutation = {
  createEmergency: {
    type: emergencyMutationType,
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
      concern: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const emergencyModel = new EmergencyModel(params);

      const newEmergency = await emergencyModel.save();
      if (!newEmergency) {
        throw new Error("Could not save the emergency data!");
      }

      return newEmergency;
    },
  },

  updateEmergency: {
    type: emergencyMutationType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      concern: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      return await EmergencyModel.findByIdAndUpdate(
        params.id,
        {
          concern: params.concern,
        },
        function (err) {
          if (err) return next(err);
        }
      ).exec();
    },
  },

  deleteEmergency: {
    type: emergencyMutationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const removedEmergency = await EmergencyModel.findByIdAndRemove(
        params.id
      ).exec();
      if (!removedEmergency) {
        throw new Error("Error removing emergency data");
      }
      return removedEmergency;
    },
  },
};

module.exports = {
  emergencyQuery: queryType,
  emergencyMutation: Mutation,
};
