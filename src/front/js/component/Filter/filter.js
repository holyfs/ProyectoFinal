import React from "react";
import Gender from "./category/Gender";

const Filter = ({
    pageNumber,
    updatePageNumber,
    updateGender
  }) => {
    let clear = () => {
      updateGender("");
      updatePageNumber(1);
      window.location.reload(false);
    };
    return (
      <div className="col-lg-3 col-12 mb-5">
        <div className="text-center fw-bold fs-4 mb-2">Filters</div>
        <div
          style={{ cursor: "pointer" }}
          onClick={clear}
          className="text-primary text-decoration-underline text-center mb-3"
        >
          Clear Filters
        </div>
        <div className="accordion" id="accordionExample">
        <Gender
          updatePageNumber={updatePageNumber}
          updateGender={updateGender}
        />
  </div>
      </div>
    );
  };
  
  export default Filter;