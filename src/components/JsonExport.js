import React,{useEffect} from "react";
import { CSVLink } from "react-csv";
import { getCategories } from "../actions/categoryActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const headers = [
  { label: "Id", key: "id" },
  { label: "Creation Date", key: "createdAt" },
  { label: "Category Name", key: "categoryName" },
  { label: "Category Id", key: "categoryId" },
];

function JsonExport(props) {
    useEffect(() => {
        props.getCategories();
      }, []);

      const categories = props.category.categories;
      console.log(categories);

      const csvReport = {
        filename: "Report.csv",
        headers: headers,
        data: categories,
      };
  return (
    <>
      <CSVLink {...csvReport}>Download File</CSVLink>;
    </>
  );
}
JsonExport.propTypes = {
    category: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    category: state.categories,
  });
  
  export default connect(mapStateToProps, { getCategories })(JsonExport);
