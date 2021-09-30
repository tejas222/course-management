import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { getCategories } from "../actions/categoryActions";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import SearchBar from "material-ui-search-bar";
import SelectSearch from "react-select-search";

import CategoryDisplay from "./CategoryDisplay";

const PER_PAGE = 5;

const options = [
  { name: "Sort by Ascending Date", value: "asc" },
  { name: "Sort by Decending Date", value: "dec" },
];

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState("");
  const [filter, setFilter] = useState([]);
  const [DropdownVal,setNewFilter] = useState("");
  const [SearchBarVal, setNewSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("http://localhost:3333/category")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilter(data);
      });
  }

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(filter.length / PER_PAGE);

  const currentPageData = filter
    .slice(offset, offset + PER_PAGE)
    .map((category) => (
      <CategoryDisplay key={category.id} category={category} />
    ));

  // Pagination
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
// Sort function
  function asc_sort(a, b) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }

  function dec_sort(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  //Search Bar
  const handleSearch = (searchedVal) => {
    setNewSearch(searchedVal);
    let filteredData = data.filter((item) => {
        return (
          item.categoryName.toLowerCase().includes(searchedVal.toLowerCase())
        );
    });
    if(filter==="asc"){
        filteredData.sort(asc_sort);
    }
    if(filter==="dec"){
        filteredData.sort(dec_sort);
    }
    setFilter(filteredData);
  };

  const cancelSearch = () => {
    setSearched("");
    handleSearch(searched);
  };
  //Drowpdown
  
  const ascFilter = () => {
    let filteredData = data.sort(asc_sort);
    if(SearchBarVal){

     filteredData = filteredData.filter((item) => {

      return item.categoryName
        .toLowerCase()
        .includes(SearchBarVal.toLowerCase());
    });
}
    setFilter(filteredData);
  };

  const decFilter = () => {
    let filteredData = data.sort(dec_sort);
    if(SearchBarVal){
     filteredData = filteredData.filter((item) => {
      return item.categoryName
        .toLowerCase()
        .includes(SearchBarVal.toLowerCase());
    });
}
    setFilter(filteredData);
  };

  const handleDropdown = (e) => {
    setNewFilter(e);
    if (e === "asc") {
      ascFilter();
    }

    if (e === "dec") {
      decFilter();
    }

  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8  m-auto">
            <h1 className="text-center">Course Categories</h1>

            <hr />
            <SearchBar
              value={searched}
              onChange={(searchVal) => handleSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <SelectSearch
              options={options}
              placeholder="Choose your Filter"
              value={searched}
              onChange={handleDropdown}
            />
            <div className="data-container">{currentPageData}</div>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.categories,
});

export default connect(mapStateToProps, { getCategories })(Dashboard);
