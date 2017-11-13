import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
  Router,
  Route
} from 'react-router-dom'

import Authenticate from './Authenticate';
import Gallery from './gallery/Gallery';

const history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Router history={history}>
      <div>
        <Route exact path="/" component={Gallery} />
        <Route path="/upload" component={Authenticate} />
      </div>
    </Router>,
    document.getElementById('mount')
  );
});
