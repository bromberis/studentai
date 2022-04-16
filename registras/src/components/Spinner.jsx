import React from "react";
import * as ReactBootstrap from "react-bootstrap";

function Spinner() {
  return (
    <div className="container h-100 d-inline-block">
      <div className="row">
        <div className="col text-center my-auto align-middle">
          <ReactBootstrap.Spinner animation="grow" />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
