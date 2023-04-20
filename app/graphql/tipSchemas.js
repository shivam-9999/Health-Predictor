const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;

const TipModel = require("../models/tipModel");

const tipType = new GraphQLObjectType({
  name: "Tip",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      title: {
        type: GraphQLString,
      },
      content: {
        type: GraphQLString,
      },
    };
  },
});

const queryType = {
  tips: {
    type: new GraphQLList(tipType),
    resolve: function () {
      const tips = TipModel.find().exec();
      if (!tips) {
        throw new Error("Tips not found");
      }
      return tips;
    },
  },

  tip: {
    type: tipType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const tip = TipModel.findById(params.id).exec();
      if (!tip) {
        throw new Error("Tip not found");
      }
      return tip;
    },
  },
};

const Mutation = {
  createTip: {
    type: tipType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const tipModel = new TipModel(params);

      const newTip = await tipModel.save();
      if (!newTip) {
        throw new Error("Could not save the tip data!");
      }
      return newTip;
    },
  },

  updateTip: {
    type: tipType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      return await TipModel.findByIdAndUpdate(
        params.id,
        {
          title: params.title,
          content: params.content,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },

  deleteTip: {
    type: tipType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const removedTip = await TipModel.findByIdAndRemove(params.id).exec();
      if (!removedTip) {
        throw new Error("Error removing tip data");
      }
      return removedTip;
    },
  },
};

module.exports = {
  tipQuery: queryType,
  tipMutation: Mutation,
};
