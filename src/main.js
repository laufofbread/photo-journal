import React from 'react';
import ReactDOM from 'react-dom';
import UploadForm from './UploadForm';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(UploadForm),
    document.getElementById('mount')
  );
});
