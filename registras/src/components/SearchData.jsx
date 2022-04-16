import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Search from "./Search";
import Spinner from "./Spinner";

function SearchData() {
  const [studentsData, setStudentsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);
  const fetchData = async () => {
    await fetch("http://localhost:3005/api/v1/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudentsData(data.data.students);
        console.log(data.data.students);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Oops", "Klaida!", "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const usersData = studentsData.map((data) => {
  //   return <Search key={data._id} name={data.name} />;
  // });

  // return <>{isLoading ? usersData : <Spinner />}</>;

  return <></>;
}

export default SearchData;
