import React from 'react';
import './NotFound.css';
import Header from '../../Header/Header';
import { useLanguage } from '../../../MISC/LanguageContext';
const NotFound = () => {
  const {language, toggleLanguage, t} = useLanguage();
  return (
    <>
      <Header />
      <div className="notfound-container">
        <h1>{t.context.S13}</h1>
        <p>{t.context.S14}</p>
       
      </div>
    </>
  );
};

export default NotFound;
