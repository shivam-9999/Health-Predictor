const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: [true, "Please add a course code"],
        unique: [true, "courseCode is already in use"],
      },
      courseName: {
        type: String,
        required: [true, "Please add a course name"],
      },
      courseSection: {
        type: String,
        required: [true, "Please add a course section"],
      },
      courseSemester: {
        type: String,
        required: [true, "Please add a course semester"],
      },
      enrolledStudents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      ]
});

module.exports = mongoose.model('Course', CourseSchema);
