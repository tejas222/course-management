import React from "react";
import { Link } from "react-router-dom";

export default function AddButton() {
  return (
    <>
      <Link to="/addcategory" className="btn btn-sm btn-success mt-2">
        Add Category
      </Link>
    </>
  );
}
