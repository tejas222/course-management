import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCategories } from '../actions/categoryActions';

import CategoryDisplay from './CategoryDisplay';
import SearchData from './SearchData';
import JsonExport from './JsonExport';
import AddButton from '../components/Buttons/AddButton';
import SortCategory from './SortCategory';
import Pagination from './Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      postsPerPage: 5,
    };
  }

  componentDidMount() {
    this.props.getCategories();
    console.log('in did mount');
  }

  render() {
    const categories = this.props.category.categories;

    console.log(categories.length);

    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = categories.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
    };
    console.log('Paginate', paginate);
    return (
      <>
        <div className='container mt-4'>
          <div className='col-md-8 m-auto'>
            <h1 className='text-center'>Course Categories</h1>
            <hr />
            <div className='row d-flex justify-content-evenly'>
              <div className='col-md-6 '>
                <SearchData />
              </div>

              <div className='col-md-4 text-center'>
                <SortCategory />
              </div>
              <div className='col-md-1 text-center'>
                <AddButton />
              </div>
              <div className='col-md-1 text-center '>
                <JsonExport />
              </div>
            </div>

            <div className='row'>
              {currentPosts.map((category) => (
                <CategoryDisplay key={category.id} category={category} />
              ))}
              <Pagination
                postsPerPage={this.state.postsPerPage}
                totalPosts={categories.length}
                paginate={paginate}
              />
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
