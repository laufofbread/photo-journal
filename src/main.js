import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import Authenticate from './Authenticate';
import Gallery from './Gallery';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Router>
      <div>
        <Route exact path="/" component={Gallery} />
        <Route path="/upload" component={Authenticate} />
      </div>
    </Router>,
    document.getElementById('mount')
  );
});
