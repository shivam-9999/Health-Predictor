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
            nurseEmail: {
                type: GraphQLString,
            },
            token: {
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
    addNurse: {
        type: nurseType,
        args: {
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
            nurseEmail: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            const nurseModel = new NurseModel(params);
            const newUser = await nurseModel.save();
            if (!newUser) {
                throw new Error("Error");
            }
            return newUser;
        }
    },
    updateNurse: {
        type: nurseType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString)
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
            nurseEmail: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            return NurseModel.findByIdAndUpdate(params.id, { password: params.password, firstName: params.firstName, lastName: params.lastName, address: params.address, nurseEmail: params.nurseEmail }, function (err) {
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
        type: nurseType,
        args: {
            nurseEmail: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            const nurse = await NurseModel.findOne({ nurseEmail: params.nurseEmail });
            if (!nurse) {
                throw new Error("Nurse not found");
            }
            const valid = await bcrypt.compare(params.password, nurse.password);
            if (!valid) {
                throw new Error("Invalid password");
            }
            const token = jwt.sign({ nurseEmail: nurse.nurseEmail }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            });
            nurse.token = token;
            return nurse;
        }
    },
    logoutNurse: {
        type: nurseType,
        args: {
            token: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async function (root, params) {
            const nurse = await NurseModel.findOne({ token: params.token });
            if (!nurse) {
                throw new Error("Nurse not found");
            }
            nurse.token = "";
            return nurse;
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
            const nurse = await NurseModel.findOne({ token: params.token });
            if (!nurse) {
                throw new Error("Nurse not found");
            }
            return nurse;
        }
    },
};

module.exports = new GraphQLObjectType({
    nurseQuery: queryType, 
    nurseMutation: Mutation,
});


