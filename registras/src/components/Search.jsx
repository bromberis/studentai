import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import * as moment from "moment";

function Search() {
  const [searchParams, setSearchParams] = useState("");

  // pasidaryti fetch ir use state naują
  const [studentsData, setStudentsData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await fetch("http://localhost:3005/api/v1/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudentsData(data.data.students);
        console.log(data.data.students);
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Oops", "Klaida!", "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Vardas"
        onChange={(e) => {
          setSearchParams(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Pavarde"
        onChange={(e) => {
          setSearchParams(e.target.value);
        }}
      />

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
          {searchParams &&
            studentsData.map(
              (student) =>
                student.name
                  .toLowerCase()
                  .includes(searchParams.toLowerCase()) && (
                  <tr key={student._id}>
                    <td className="align-middle">{student.name}</td>
                    <td className="align-middle">{student.surname}</td>
                    <td className="align-middle">
                      {moment(student.birthdate).format("YYYY-MM-DD")}
                    </td>
                    <td className="align-middle">{student.city}</td>
                    <td className="align-middle">{student.program}</td>
                    <td className="align-middle">{student.group}</td>
                    <td>
                      <Link to="/edit">
                        <button
                          // onClick={() => {
                          //   props.editRow(student);
                          // }}
                          className="btn btn-outline-dark button-custom"
                        >
                          Atnaujinti
                        </button>
                      </Link>
                      <button
                        // onClick={() => props.deleteStudent(student._id)}
                        className="btn btn-outline-danger button-custom"
                      >
                        Ištrinti
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
