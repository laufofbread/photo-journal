import React from 'react';
import ReactDOM from 'react-dom';
import Authenticate from './Authenticate';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Authenticate />,
    document.getElementById('mount')
  );
});
