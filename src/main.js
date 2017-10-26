import React from 'react';
import ReactDOM from 'react-dom';
import UploadForm from './UploadForm';
import EditRemoveList from './EditRemove';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <section>
      <UploadForm/>
      <EditRemoveList/>
    </section>,
    document.getElementById('mount')
  );
});
