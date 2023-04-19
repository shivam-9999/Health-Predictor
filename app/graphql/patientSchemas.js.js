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

const studentType = new GraphQLObjectType({
  name: "student",
  fields: function () {
    return {
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
  students: {
    type: new GraphQLList(studentType),
    resolve: function () {
      const students = PatientModel.find().exec();
      if (!students) {
        throw new Error("Students not found");
      }
      return students;
    },
  },

  student: {
    type: studentType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const student = PatientModel.findById(params.id).exec();
      if (!student) {
        throw new Error("Student not found");
      }
      return student;
    },
  },
};

const Mutation = {
  signUp: {
    type: studentType,
    args: {
      // studentNo: {
      //   type: new GraphQLNonNull(GraphQLString),
      // },
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
      // city: {
      //   type: new GraphQLNonNull(GraphQLString),
      // },
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

      const newStudent = patientModel.save();
      if (!newStudent) {
        throw new Error("Could not save the student!");
      }
      return newStudent;
    },
  },

  authenticate: {
    type: studentType,
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
        token: jwt.sign({ _id: user._id, email: user.email }, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds,
        }),
        _id: user.id,
      };
    },
  },

  updateStudent: {
    type: studentType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      // studentNo: {
      //   type: GraphQLString,
      // },
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
    },
    resolve(root, params) {
      return PatientModel.findByIdAndUpdate(
        params.id,
        {
          // studentNo: params.studentNo,
          firstName: params.firstName,
          lastName: params.lastName,
          address: params.address,
          city: params.city,
          phoneNumber: params.phoneNumber,
          email: params.email,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },

  deleteStudent: {
    type: studentType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(root, params) {
      const deleteStudent = PatientModel.findByIdAndRemove(params.id).exec();
      if (!deleteStudent) {
        throw new Error("Could not delete the student!");
      }
      return deleteStudent;
    },
  },
};

module.exports = {
  studentQuery: queryType,
  studentMutation: Mutation,
};
