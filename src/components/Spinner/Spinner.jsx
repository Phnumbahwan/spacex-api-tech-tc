import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './spinner.scss';

function Spinner({ color }) {
  return (
    <div className="spinner" style={{ color }}>
      <div />
      <div />
      <div />
    </div>
  );
}

Spinner.propTypes = {
  color: PropTypes.string,
};

Spinner.defaultProps = {
  color: null,
};

export default Spinner;
