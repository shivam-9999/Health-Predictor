// const { findByIdAndUpdate } = require("../models/User");
var MotivationalVideoModel = require("../models/motivationalVideoModel");
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;

const motivationalVideoType = new GraphQLObjectType({
  name: "motivationalVideo",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      title: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      videoUrl: {
        type: GraphQLString,
      },
    };
  },
});

const motivationalVideoQuery = {
  motivationalVideos: {
    type: new GraphQLList(motivationalVideoType),
    resolve: async () => {
      const motivationalVideos = await MotivationalVideoModel.find().exec();
      if (!motivationalVideos) {
        throw new Error("Error");
      }
      return motivationalVideos;
    },
  },
  motivationalVideo: {
    type: motivationalVideoType,
    args: {
      id: {
        name: "_id",
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const motivationalVideo = await MotivationalVideoModel.findById(
        args.id
      ).exec();
      if (!motivationalVideo) {
        throw new Error("Error");
      }
      return motivationalVideo;
    },
  },
};

const motivationalVideoMutation = {
  addMotivationalVideo: {
    type: motivationalVideoType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
      videoUrl: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const MotivationalVideo = new MotivationalVideoModel(args);
      const newMotivationalVideo = await MotivationalVideo.save();
      if (!newMotivationalVideo) {
        throw new Error("Error");
      }
      return newMotivationalVideo;
    },
  },
  updateMotivationalVideo: {
    type: motivationalVideoType,
    args: {
      id: {
        name: "_id",
        type: new GraphQLNonNull(GraphQLString),
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
      videoUrl: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      return await MotivationalVideoModel.findByIdAndUpdate(
        args.id,
        {
          title: args.title,
          description: args.description,
          videoUrl: args.videoUrl,
        },
        { new: true }
      );
    },
  },
  deleteMotivationalVideo: {
    type: motivationalVideoType,
    args: {
      id: {
        name: "_id",
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const removedMotivationalVideo =
        await MotivationalVideoModel.findByIdAndRemove(args.id).exec();
      if (!removedMotivationalVideo) {
        throw new Error("Error");
      }
      return removedMotivationalVideo;
    },
  },
};

module.exports = {
  motivationalVideoQuery: motivationalVideoQuery,
  motivationalVideoMutation: motivationalVideoMutation,
};