import React, { Component } from "react";

import { connect } from "react-redux";
import { getCategories } from "../actions/categoryActions";
import PropTypes from "prop-types";

import CategoryDisplay from "./CategoryDisplay";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getCategories();
    console.log("in did mount");
  }

  render() {
    const categories = this.props.category.categories;
    console.log(categories);
    return (
      <>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8  m-auto">
              <h1 className="text-center">Course Categories</h1>

              <hr />
              {categories.map((category) => (
                <CategoryDisplay key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
Dashboard.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.categories,
});

export default connect(mapStateToProps, { getCategories })(Dashboard);
