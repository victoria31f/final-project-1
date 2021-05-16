import './Spinner.css';
import React from 'react';

const Spinner = () => (
  <div className="d-flex justify-content-center p-5">
    <div className="spinner-border spinner text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
