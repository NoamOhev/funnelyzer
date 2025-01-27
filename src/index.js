import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // אם תרצה להוסיף CSS בעתיד
import FunnelAnalyzer from './app'; // זה הקובץ המרכזי שלך

ReactDOM.render(
  <React.StrictMode>
    <FunnelAnalyzer />
  </React.StrictMode>,
  document.getElementById('root')
);
