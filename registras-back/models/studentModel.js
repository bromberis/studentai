const mongoose = require("mongoose");

// DB schema
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  city: {
    type: String,
  },
  program: {
    type: String,
  },
  group: {
    type: String,
  },
});

// Modelis DB lentelės pavadinimas
const Students = new mongoose.model("Students_register", studentsSchema);

// const testStudents = new Students({
//   name: "Joana",
//   lastname: "Baldyte",
//   birthdate: "1999-01-01",
//   city: "London",
//   studyprogram: "JS",
//  group: "1"
// });

// testStudents.save();

module.exports = Students;
