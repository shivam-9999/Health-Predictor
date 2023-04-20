const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load iris training data
const record = JSON.parse(fs.readFileSync('./record_train.json'));

const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLFloat = require("graphql").GraphQLFloat;

const HealthPatientModel = require("../models/healthPatientModel");

const patientType = require("./patientSchemas").patientType;

const healthType = new GraphQLObjectType({
  name: "HealthPatient",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: patientType,
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

const healthMutationType = new GraphQLObjectType({
  name: "HealthPatientMutation",
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
  healthPatients: {
    type: new GraphQLList(healthType),
    resolve: function () {
      const healths = HealthPatientModel.find().populate("patient").exec();
      if (!healths) {
        throw new Error("Healths not found");
      }
      return healths;
    },
  },

  healthPatientsByPatient: {
    type: new GraphQLList(healthType),
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const healths = HealthPatientModel
        .find({ patient: params.patient })
        .populate("patient")
        .exec();
      if (!healths) {
        throw new Error("Healths not found");
      }
      return healths;
    },
  },

  healthPatient: {
    type: healthType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const health = HealthPatientModel
        .findById(params.id)
        .populate("patient")
        .exec();
      if (!health) {
        throw new Error("Health not found");
      }
      return health;
    },
  },

  predictHealthCondition: {
    type: new GraphQLObjectType({
      name: "PredictHealthCondition",
      fields: function () {
        return {
          status: {
            type: GraphQLString,
          },
        };
      },
    }),
    args: {
      body_temperature: {
        type: new GraphQLNonNull(GraphQLFloat),
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
      respiratory_rate: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
    },
    resolve: async function (root, params) {
      // Load iris testing data
      const testingData = [[
        params.body_temperature,
        params.heart_rate,
        params.systolic_pressure,
        params.diastolic_pressure,
        params.respiratory_rate
      ]];
    
      // convert/setup our data for tensorflow.js
    
      //tensor of features for training data
      const trainingData = tf.tensor2d(record.map(item => [
        item.body_temperature,
        item.heart_rate,
        item.systolic_pressure,
        item.diastolic_pressure,
        item.respiratory_rate
      ]));
      
      //tensor of output for training data
      //the values for species will be:
      // status 1:       1,0
      // status 2:       0,1
      const outputData = tf.tensor2d(record.map(item => [
        item.status === 1 ? 1 : 0,
        item.status === 2 ? 1 : 0
      ]));
      
      // build neural network using a sequential model
      const model = tf.sequential();
      //add the first layer
      model.add(tf.layers.dense({
        inputShape: [5], // 5 input neurons (features)
        activation: "sigmoid",
        units: 30, //dimension of output space (first hidden layer)
      }));
      
      //add the second hidden layer
      model.add(tf.layers.dense({
        inputShape: [30], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 15, //dimension of final output (die or live)
      }));
      
      //add output layer
      model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
      }));
      
      //compile the model with an MSE loss function and Adam algorithm
      model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.003),
        metrics: ['accuracy'],
      });
      
      // train/fit the model for the fixed number of epochs
      const startTime = Date.now();
      
      async function run() {
        const startTime = Date.now();
        await model.fit(trainingData, outputData, {
          epochs: 1000,
          callbacks: {
            onEpochEnd: async (epoch, log) => {
              elapsedTime = Date.now() - startTime;
            }
          }
        }); //fit
    
        // get the prediction results
        const results = model.predict(tf.tensor2d(testingData));
        console.log('prediction results: ', results.dataSync());
        
        var dangerCount = 0;
        const array = results.arraySync();
        array.forEach(result => {
          if (result[0] < result[1]) {
            dangerCount++;
          }
        });
    
        console.log("dangerCount >> ", dangerCount);
    
        var status;
        if (dangerCount > 1) {
          status = 'danger';
        } else {
          status = 'ok';
        }
        
        return status;
      } //end of run function
      
      return {
        status: await run()
      };
    },
  }
};

const Mutation = {
  createHealth: {
    type: healthMutationType,
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
      const healthPatientModel = new HealthPatientModel(params);

      const newHealth = await healthPatientModel.save();
      if (!newHealth) {
        throw new Error("Could not save the health data!");
      }
      return newHealth;
    },
  },

  updateHealth: {
    type: healthMutationType,
    args: {
      id: {
        name: "id",
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
      return await HealthPatientModel.findByIdAndUpdate(
        params.id,
        {
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
    type: healthMutationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const removedHealth = await HealthPatientModel.findByIdAndRemove(params.id).exec();
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
