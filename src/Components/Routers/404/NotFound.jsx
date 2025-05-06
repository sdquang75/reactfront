import React from 'react';
import './NotFound.css';
import Header from '../../Common/Header/Header';

const NotFound = () => {

  return (
    <>
      <Header />
      <div className="notfound-container">
        <h1>Sorry</h1>
        <p>Not found</p>
       
      </div>
    </>
  );
};

export default NotFound;
