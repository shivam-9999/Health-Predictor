var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var PatientModel = require("../models/patientModel");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const patientType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      userType: { type: GraphQLString },
      _id: {
        type: GraphQLString,
      },
      // studentNo: {
      //   type: GraphQLString,
      // },

      password: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      // city: {
      //   type: GraphQLString,
      // },
      phoneNumber: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },

      token: {
        type: GraphQLString,
      },
    };
  },
});

const queryType = {
  patients: {
    type: new GraphQLList(patientType),
    resolve: function () {
      const patients = PatientModel.find({ userType: "patient" }).exec();
      if (!patients) {
        throw new Error("patients not found");
      }
      return patients;
    },
  },

  patient: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const patient = PatientModel.findById(params.id).exec();
      if (!patient) {
        throw new Error("patient not found");
      }
      return patient;
    },
  },
  nurses: {
    type: new GraphQLList(patientType),
    resolve: async () => {
      const nurses = await PatientModel.find({ userType: "nurses" });
      return nurses;
    },
  },
};

const Mutation = {
  signUp: {
    type: patientType,
    args: {
      // studentNo: {
      //   type: new GraphQLNonNull(GraphQLString),
      // },
      userType: { type: new GraphQLNonNull(GraphQLString) },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
      address: {
        type: new GraphQLNonNull(GraphQLString),
      },
      phoneNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const hashed = await bcrypt.hashSync(params.password, 10);

      const patientModel = new PatientModel({
        ...params,
        password: hashed,
      });

      const newPatient = patientModel.save();
      if (!newPatient) {
        throw new Error("Could not save the student!");
      }
      return newPatient;
    },
  },

  authenticate: {
    type: patientType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const user = await PatientModel.findOne({
        email: params.email,
      }).exec();
      console.log(user, user);
      if (!user) {
        throw new Error("Login failed!");
      }

      const valid = await bcrypt.compareSync(params.password, user.password);

      if (!valid) {
        throw new Error("Password did not match!");
      }
      return {
        token: jwt.sign(
          { _id: user._id, email: user.email, userType: user.userType },
          jwtKey,
          {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          }
        ),
        _id: user.id,
        userType: user.userType,
      };
    },
  },

  deletePatient: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(root, params) {
      const deletePatient = PatientModel.findByIdAndRemove(params.id).exec();
      if (!deletePatient) {
        throw new Error("Could not delete the student!");
      }
      return deletePatient;
    },
  },
};

module.exports = {
  patientQuery: queryType,
  patientMutation: Mutation,
};
