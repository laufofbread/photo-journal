import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
  Router,
  Route,
  Link
} from 'react-router-dom';

import Authenticate from './Authenticate';
import Gallery from './gallery/Gallery';
import About from './about/About';

const history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Router history={history}>
      <div>
        <ul className="nav">
          <li>
            <Link className="logo" to="/">A Lauf Adventure</Link>
          </li>
          <li className="nav-link">
            <Link to="/about">About</Link>
          </li>
        </ul>

        <Route exact path="/" component={Gallery} />
        <Route path="/upload" component={Authenticate} />
        <Route path="/about" component={About} />
      </div>
    </Router>,
    document.getElementById('mount')
  );
});
