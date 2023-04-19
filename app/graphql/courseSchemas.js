var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
const mongoose = require("mongoose");

var StudentModel = require("../models/patientModel");
var CourseModel = require("../models/courseModel");

const courseType = new GraphQLObjectType({
  name: "course",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      courseCode: {
        type: GraphQLString,
      },
      courseName: {
        type: GraphQLString,
      },
      courseSection: {
        type: GraphQLString,
      },
      courseSemester: {
        type: GraphQLString,
      },
      enrolledStudents: {
        type: new GraphQLList(GraphQLString),
      },
    };
  },
});

const queryType = {
  courses: {
    type: new GraphQLList(courseType),
    resolve: function () {
      const courses = CourseModel.find().exec();
      if (!courses) {
        throw new Error("Courses not found");
      }
      return courses;
    },
  },

  course: {
    type: courseType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const course = CourseModel.findById(params.id).exec();
      if (!course) {
        throw new Error("Course not found");
      }
      return course;
    },
  },

  coursesByStudent: {
    type: new GraphQLList(courseType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const student = StudentModel.findById(params.id).exec();
      const courses = CourseModel.find({
        enrolledStudents: student.id,
      });
      if (!courses) {
        throw new Error("Courses not found");
      }
      return courses;
    },
  },
};

const Mutation = {
  createCourse: {
    type: courseType,
    args: {
      courseCode: {
        type: new GraphQLNonNull(GraphQLString),
      },
      courseName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      courseSection: {
        type: new GraphQLNonNull(GraphQLString),
      },
      courseSemester: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const courseModel = new CourseModel(params);

      const newCourse = courseModel.save();
      if (!newCourse) {
        throw new Error("Could not save the course!");
      }
      return newCourse;
    },
  },

  // updateCourse: {
  //   type: courseType,
  //   args: {
  //     id: {
  //       name: "id",
  //       type: new GraphQLNonNull(GraphQLString),
  //     },
  //     courseCode: {
  //       type: new GraphQLNonNull(GraphQLString),
  //     },
  //     courseName: {
  //       type: new GraphQLNonNull(GraphQLString),
  //     },
  //     courseSection: {
  //       type: new GraphQLNonNull(GraphQLString),
  //     },
  //     courseSemester: {
  //       type: new GraphQLNonNull(GraphQLString),
  //     },
  //   },
  //   resolve(root, params) {
  //     return CourseModel.findByIdAndUpdate(
  //       params.id,
  //       {
  //         courseCode: params.courseCode,
  //         courseName: params.courseName,
  //         courseSection: params.courseSection,
  //         courseSemester: params.courseSemester,
  //       },
  //       function (err) {
  //         if (err) return next(err);
  //       }
  //     );
  //   },
  // },

  // deleteCourse: {
  //   type: courseType,
  //   args: {
  //     id: {
  //       type: new GraphQLNonNull(GraphQLString),
  //     },
  //   },
  //   resolve(root, params) {
  //     const deleteCourse = CourseModel.findByIdAndRemove(params.id).exec();
  //     if (!deleteCourse) {
  //       throw new Error("Could not delete the course!");
  //     }
  //     return deleteCourse;
  //   },
  // },
};

module.exports = {
  courseQuery: queryType,
  courseMutation: Mutation,
};
