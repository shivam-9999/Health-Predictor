const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
var NurseModel = require("../models/nurseModel");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const nurseType = new GraphQLObjectType({
    name: "nurse",
    fields: function () {
        return {
            _id: {
                type: GraphQLString,
            },
            email: {
                type: GraphQLString,
            },
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
            phoneNumber: {
                type: GraphQLString,
            },
        };
    },
});

const queryType = {
    nurses: {
        type: new GraphQLList(nurseType),
        resolve: function () {
            const nurses = NurseModel.find().exec();
            if (!nurses) {
                throw new Error("Nurses not found");
            }
            return nurses;
        }
    },
    nurse: {
        type: nurseType,
        args: {
            id: {
                name: "_id",
                type: GraphQLString
            }
        },
        resolve: function (root, params) {
            const nurseDetails = NurseModel.findById(params.id).exec();
            if (!nurseDetails) {
                throw new Error("Nurse not found");
            }
            return nurseDetails;
        }
    },
   
};

const Mutation ={
    signUpNurse: {
        type: nurseType,
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
          phoneNumber: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (root, params) => {
          const hashed = await bcrypt.hashSync(params.password, 10);
    
          const nurseModel = new NurseModel({
            ...params,
            password: hashed,
          });
    
          const newNurse = nurseModel.save();
          if (!newNurse) {
            throw new Error("Could not save the nurse!");
          }
          return newNurse;
        },
    },

    updateNurse: {
        type: nurseType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            },
            firstName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            address: {
                type: new GraphQLNonNull(GraphQLString),
            },
            phoneNumber: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            return NurseModel.findByIdAndUpdate(params.id, { password: params.password, firstName: params.firstName, lastName: params.lastName, address: params.address, email: params.email }, function (err) {
                if (err) return next(err);
            });
        }
    },
    deleteNurse: {
        type: nurseType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: async function (root, params) {
            const remNurse = NurseModel.findByIdAndRemove(params.id).exec();
            if (!remNurse) {
                throw new Error("Error")
            }
            return remNurse;
        },
    },

    loginNurse: {
        type: new GraphQLObjectType({
            name: "loginNurse",
            fields: () => ({
                token: { type: GraphQLString },
            }),
        }),
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            const nurse = await NurseModel.findOne({ email: params.email });
            if (!nurse) {
                throw new Error("Nurse not found");
            }
            const valid = await bcrypt.compare(params.password, nurse.password);
            if (!valid) {
                throw new Error("Invalid password");
            }
            const token = jwt.sign({ _id: nurse._id }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            });

            return {
                token,
            };
        }
    },
    verifyNurse: { 
        type: nurseType,
        args: {
            token: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            const { _id } = jwt.verify(params.token, jwtKey);

            const nurse = await NurseModel.findById(_id).exec();
            if (!nurse) {
                throw new Error("Nurse not found");
            }
            return nurse;
        }
    },
};

module.exports = {
    nurseQuery: queryType, 
    nurseMutation: Mutation,
};


