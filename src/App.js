import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';

import Dashboard from './components/Dashboard';
import CreateCategory from './components/CreateCategory';
import Navbar from './components/Navigation/Navbar';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import EditCategory from './components/EditCategory';

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Router>
            <Navbar />
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/addcategory' component={CreateCategory} />
            <Route exact path='/editcategory/:id' component={EditCategory} />
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
