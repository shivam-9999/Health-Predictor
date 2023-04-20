const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NurseSchema = new Schema({
    password:{  
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    nurseEmail: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "email address must be unique"],
    }
});

NurseSchema.virtual("fullName")
    .get(function () {
        return "Nurse " + this.firstName + " " + this.lastName;
    }
    )
    .set(function (fullName) {
        const splitName = fullName.split(" ");
        this.firstName = splitName[0] || "";
        this.lastName = splitName[1] || "";
    });

NurseSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

module.exports = mongoose.model("Nurse", NurseSchema);

