import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCategory, getCategories } from '../actions/categoryActions';

export class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: '',
      categoryName: '',
      createdAt: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.categoryId === '' ||
      this.state.categoryName === '' ||
      this.state.createdAt === ''
    ) {
      alert('All Fields Are Mandatory!!');
    } else {
      const newCategory = {
        categoryId: this.state.categoryId,
        categoryName: this.state.categoryName,
        createdAt: this.state.createdAt,
      };

      console.log('new Category object', newCategory);
      this.props.createCategory(newCategory, this.props.history);
    }
  };

  render() {
    return (
      <>
        <div className='container mt-4'>
          <div className='row text-center'>
            <div className='col-md-6 text-center m-auto'>
              <h1 className='text-center'>Add New Category</h1>

              <hr />
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-md-6 m-auto'>
              <form onSubmit={this.handleSubmit}>
                <div className='mb-3'>
                  <label for='exampleInputEmail1' className='form-label'>
                    Category Id
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Category Id'
                    name='categoryId'
                    value={this.state.categoryId}
                    onChange={this.onChange}
                  />
                  <p id='error' className='text-danger'></p>
                </div>

                <div className='mb-3'>
                  <label for='exampleInputEmail1' className='form-label'>
                    Category Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Category Name'
                    value={this.state.categoryName}
                    name='categoryName'
                    onChange={this.onChange}
                  />
                  <p id='error' className='text-danger'></p>
                </div>
                <div className='mb-3'>
                  <label for='exampleInputEmail1' className='form-label'>
                    Created On
                  </label>
                  <input
                    type='date'
                    className='form-control'
                    placeholder='Enter Date'
                    value={this.state.createdAt}
                    name='createdAt'
                    onChange={this.onChange}
                  />
                  <p id='error' className='text-danger'></p>
                </div>
                <input
                  type='submit'
                  className='btn btn-success btn-block mt-2'
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  createCategory: state.categories,
  errors: state.errors,
});

export default connect(mapStateToProps, { createCategory, getCategories })(
  CreateCategory
);
