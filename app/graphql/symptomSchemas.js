const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLBoolean = require("graphql").GraphQLBoolean;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLDate = require("graphql-iso-date").GraphQLDateTime;

const SymptomModel = require("../models/symptomModel");

const symptomType = new GraphQLObjectType({
  name: "Symptom",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: GraphQLString,
      },
      fever: {
        type: GraphQLBoolean,
      },
      cough: {
        type: GraphQLBoolean,
      },
      breathing_difficulty: {
        type: GraphQLBoolean,
      },
      headache: {
        type: GraphQLBoolean,
      },
      sore_throat: {
        type: GraphQLBoolean,
      },
      timestamp: {
        type: GraphQLDate,
      },
    };
  },
});

const queryType = {
  symptoms: {
    type: new GraphQLList(symptomType),
    resolve: function () {
      const symptoms = SymptomModel.find().populate("patient").exec();
      if (!symptoms) {
        throw new Error("Symptoms not found");
      }
      return symptoms;
    },
  },

  symptom: {
    type: symptomType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const symptom = SymptomModel.findById(params.id).populate("patient").exec();
      if (!symptom) {
        throw new Error("Symptom not found");
      }
      return symptom;
    },
  },
};

const Mutation = {
  createSymptom: {
    type: symptomType,
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
      fever: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      cough: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      breathing_difficulty: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      headache: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      sore_throat: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    resolve: async function (root, params) {
      const symptomModel = new SymptomModel(params);

      const newSymptom = await symptomModel.save();
      if (!newSymptom) {
        throw new Error("Could not save the symptom data!");
      }
      return newSymptom;
    },
  },

  updateSymptom: {
    type: symptomType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
      fever: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      cough: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      breathing_difficulty: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      headache: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      sore_throat: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    resolve: async function (root, params) {
      const symptom = await SymptomModel.findByIdAndUpdate(
        params.id,
        {
          patient: params.patient,
          fever: params.fever,
          cough: params.cough,
          breathing_difficulty: params.breathing_difficulty,
          headache: params.headache,
          sore_throat: params.sore_throat,
        },
        { new: true }
      );
      if (!symptom) {
        throw new Error("Could not update the symptom data!");
      }
      return symptom;
    },
  },

  deleteSymptom: {
    type: symptomType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const symptom = await SymptomModel.findByIdAndDelete(params.id);
      if (!symptom) {
        throw new Error("Could not delete the symptom data!");
      }
      return symptom;
    }
  }
};


module.exports = {
  symptomQuery: queryType,
  symptomMutation: Mutation,
};