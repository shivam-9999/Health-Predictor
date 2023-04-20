const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLFloat = require("graphql").GraphQLFloat;

const HealthModel = require("../models/healthModel");

const healthType = new GraphQLObjectType({
  name: "Health",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: GraphQLString,
      },
      heart_rate: {
        type: GraphQLFloat,
      },
      systolic_pressure: {
        type: GraphQLFloat,
      },
      diastolic_pressure: {
        type: GraphQLFloat,
      },
      body_temperature: {
        type: GraphQLFloat,
      },
      respiratory_rate: {
        type: GraphQLFloat,
      },
      weight: {
        type: GraphQLFloat,
      },
      timestamp: {
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
  createHealth: {
    type: healthType,
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
      heart_rate: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      systolic_pressure: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      diastolic_pressure: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      body_temperature: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      respiratory_rate: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      weight: {
        type: new GraphQLNonNull(GraphQLFloat),
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

  updateHealth: {
    type: healthType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
      heart_rate: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      systolic_pressure: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      diastolic_pressure: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      body_temperature: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      respiratory_rate: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      weight: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
    },
    resolve: async function (root, params) {
      return await HealthModel.findByIdAndUpdate(
        params.id,
        {
          patient: params.patient,
          heart_rate: params.heart_rate,
          systolic_pressure: params.systolic_pressure,
          diastolic_pressure: params.diastolic_pressure,
          body_temperature: params.body_temperature,
          respiratory_rate: params.respiratory_rate,
          weight: params.weight,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },

  deleteHealth: {
    type: healthType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const removedHealth = await HealthModel.findByIdAndRemove(params.id).exec();
      if (!removedHealth) {
        throw new Error("Error removing health data");
      }
      return removedHealth;
    },
  },
};
module.exports = {
  healthQuery: queryType,
  healthMutation: Mutation,
};
