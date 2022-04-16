import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import groupsData from "../data/groups.json";
import studiesData from "../data/program.json";
import { Link } from "react-router-dom";

function EditForm(props) {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const [student, setStudent] = useState(props.currentStudent);

  useEffect(() => {
    setStudent(props.currentStudent);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name);

    setStudent({ ...student, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="fs-2 text-center p-3 text-warning">
              Atnaujinkite informaciją
            </h2>
          </div>
        </div>
        <div className="row">
          <article className="form ">
            <form
              onSubmit={(event) => {
                event.preventDefault();

                props.updateStudent(student._id, student);
              }}
            >
              <div className="col-4 form-floating mb-3 ">
                <input
                  type="text"
                  value={student.name}
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="name"
                  {...register("name", {
                    required: true,
                    pattern: /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ\s]+$/i,
                    maxLength: 40,
                    minLength: 2,
                  })}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span className="text-danger fw-light">
                    Būtinas laukas. 2-40 simbolių, gali būti tik raidės.
                  </span>
                )}
                <label htmlFor="name">Vardas:</label>
              </div>
              <div className="col-4 form-floating mb-3">
                <input
                  type="text"
                  value={student.surname}
                  className="form-control"
                  id="surname"
                  name="surname"
                  placeholder="surname"
                  {...register("surname", {
                    required: true,
                    pattern: /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ\s]+$/i,
                    maxLength: 40,
                    minLength: 2,
                  })}
                  onChange={handleInputChange}
                />
                {errors.surname && (
                  <span className="text-danger fw-light">
                    Būtinas laukas. 2-40 simbolių, gali būti tik raidės.
                  </span>
                )}
                <label htmlFor="surname">Pavardė:</label>
              </div>

              <div className="col-4 form-floating mb-3">
                <input
                  type="date"
                  value={student.birthdate}
                  className="form-control"
                  id="birthdate"
                  {...register("birthdate", { required: true })}
                  onChange={handleInputChange}
                />
                {errors.birthdate && (
                  <span className="text-danger fw-light">Būtinas laukas.</span>
                )}
                <label htmlFor="birthdate">Gimimo metai:</label>
              </div>
              <div className="col-4 form-floating mb-3">
                <input
                  type="text"
                  value={student.city}
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="city"
                  {...register("city", {
                    required: true,
                    pattern: /^[A-Za-z\s]+$/i,
                    maxLength: 40,
                    minLength: 2,
                  })}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <span className="text-danger fw-light">
                    Būtinas laukas. 2-40 simbolių, gali būti tik raidės.
                  </span>
                )}
                <label htmlFor="city">Miestas:</label>
              </div>

              {/* ------ Studijų programa ------------  */}

              <div className="col-4 form-floating mb-3">
                <select
                  className="form-select"
                  value={student.program}
                  id="program"
                  name="program"
                  {...register("program", { required: true })}
                  onChange={handleInputChange}
                >
                  <option value="">Pasirinkite iš sąrašo</option>

                  {studiesData.map((data) => {
                    const { id, program } = data;
                    return (
                      <option key={id} value={program}>
                        {program}
                      </option>
                    );
                  })}
                </select>

                <label htmlFor="program">Studijų programa:</label>
              </div>

              {/* ------ Grupė ------------  */}

              <div className="col-4 form-floating mb-3">
                <select
                  className="form-select"
                  id="group"
                  value={student.group}
                  name="group"
                  {...register("group", { required: true })}
                  onChange={handleInputChange}
                >
                  <option value="">Pasirinkite iš sąrašo</option>

                  {groupsData.map((data) => {
                    const { id, group } = data;
                    return (
                      <option key={id} value={group}>
                        {group}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="group">Grupė:</label>
              </div>
              <Link to="/students">
                <button
                  type="submit"
                  className="btn btn-outline-warning my-3 me-2"
                >
                  Atnaujinti
                </button>
              </Link>
              <Link to="/students">
                <button
                  type="button"
                  className="btn btn-outline-danger my-3 me-2"
                >
                  Atšaukti
                </button>
              </Link>
            </form>
          </article>
        </div>
      </div>
    </>
  );
}

export default EditForm;
