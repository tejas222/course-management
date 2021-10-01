import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

export default function Navbar() {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-warning px-4'>
        <Link className='navbar-brand' to='/dashboard'>
          Course Management System
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link active' to='/dashboard'>
                Categories
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link className='nav-link' to='/addcategory'>
                Add Category
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}
