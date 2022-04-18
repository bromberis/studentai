import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import EditForm from "./components/EditForm";
import StudentsList from "./components/StudentsList";
import Search from "./components/Search";
import swal from "sweetalert";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [students, setStudents] = useState({});
  const [currentStudent, setCurrentStudent] = useState({});
  const [editing, setEditing] = useState(false);

  //Fetch Data
  const fetchData = async () => {
    await fetch("http://localhost:3005/api/v1/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.data.students);
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

  //POST Data

  const addStudent = async (student) => {
    console.log(students);

    let dbStudent = {
      name: student.name,
      surname: student.surname,
      birthdate: student.birthdate,
      program: student.program,
      city: student.city,
      group: student.group,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dbStudent),
    };
    await fetch("http://localhost:3005/api/v1/students/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        swal({
          text: "Studentas pridėtas",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Oops", "Kažkas nutiko!", "error");
      });

    fetchData();
  };

  //UPDATE DATA

  const updateStudent = (id, updatedStudent) => {
    setEditing(false);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    };
    fetch("http://localhost:3005/api/v1/students/" + id, requestOptions).then(
      (response) => response.json()
    );

    setStudents(
      students.map((student) => (student._id === id ? updatedStudent : student))
    );
  };

  const editRow = (student) => {
    setEditing(true);

    setCurrentStudent(student);
  };

  // DELETE STUDENT

  const deleteStudent = async (id) => {
    swal({
      title: "Ar tikrai norite ištrinti?",
      icon: "warning",
      buttons: ["Atšaukti", "Gerai"],
    }).then((isConfirm) => {
      if (isConfirm) {
        fetch("http://localhost:3005/api/v1/students/" + id, {
          method: "DELETE",
        }).then(() => console.log("success"));

        setStudents(students.filter((student) => student.id !== id));

        swal("Ištrinta!", "", "success");

        fetchData();
      } else {
        swal.close();
      }
    });
  };

  return (
    <div>
      <h1 className="text-center">Studentų registras</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <Router>
              <Link to="/add">
                <button
                  type="button"
                  className="btn btn-outline-dark m-3 custom-width"
                >
                  Pridėti studentą
                </button>
              </Link>

              <Link to="/students">
                <button
                  type="button"
                  className="btn btn-outline-dark m-3 custom-width"
                >
                  Studentų sąrašas
                </button>
              </Link>

              <Routes>
                <Route
                  path="/"
                  element={
                    <StudentsList
                      students={students}
                      setStudents={setStudents}
                    />
                  }
                />
                <Route path="/add" element={<Form addStudent={addStudent} />} />
                <Route
                  path="/edit"
                  element={
                    <EditForm
                      editing={editing}
                      setEditing={setEditing}
                      currentStudent={currentStudent}
                      updateStudent={updateStudent}
                    />
                  }
                />
                <Route
                  path="/students"
                  element={
                    <StudentsList
                      students={students}
                      editRow={editRow}
                      deleteStudent={deleteStudent}
                    />
                  }
                />
                <Route path="/search" element={<Search />} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
