import React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import "./StudentList.css";

let firstLettersToUppercase = (str) => {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
};

function StudentsList(props) {
  return (
    <>
      <div className="col">
        <Link to="/search">
          <button
            type="button"
            className="btn btn-info m-3 border border-dark custom-width"
          >
            Paieška
          </button>
        </Link>
      </div>
      <div className="col">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Date of Birth</th>
              <th>City</th>
              <th>Program</th>
              <th>Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.students.length > 0 ? (
              props.students.map((student) => (
                <tr key={student._id}>
                  <td className="align-middle">
                    {firstLettersToUppercase(student.name)}
                  </td>
                  <td className="align-middle">
                    {firstLettersToUppercase(student.surname)}
                  </td>

                  <td className="align-middle">
                    {moment(student.birthdate).format("YYYY-MM-DD")}
                  </td>

                  <td className="align-middle">
                    {firstLettersToUppercase(student.city)}
                  </td>
                  <td className="align-middle">{student.program}</td>
                  <td className="align-middle">{student.group}</td>
                  <td>
                    <Link to="/edit">
                      <button
                        onClick={() => {
                          props.editRow(student);
                        }}
                        className="btn btn-outline-dark button-custom"
                      >
                        Atnaujinti
                      </button>
                    </Link>
                    <button
                      onClick={() => props.deleteStudent(student._id)}
                      className="btn btn-outline-danger button-custom"
                    >
                      Ištrinti
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
        {props.students.length < 1 && <h3>List is empty.</h3>}
      </div>
    </>
  );
}

export default StudentsList;
