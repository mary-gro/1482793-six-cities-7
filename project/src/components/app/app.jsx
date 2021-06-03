import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

function App(props) {
  const {cardsCount} = props;

  return <Main cardsCount={cardsCount} />;
}

App.propTypes = {
  cardsCount: PropTypes.number.isRequired,
};

export default App;
