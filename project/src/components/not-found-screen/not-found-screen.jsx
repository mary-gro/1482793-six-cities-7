import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header.jsx';

function NotFoundScreen() {
  return (
    <div className="page">
      <Header />

      <main className="page__main" style={{textAlign: 'center'}}>
        <h1>404. Page not found</h1>
        <Link to="/">Go back to homepage</Link>
      </main>
    </div>
  );
}

export default NotFoundScreen;
