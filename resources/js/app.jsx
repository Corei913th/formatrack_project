import React from 'react';
import ReactDOM from 'react-dom/client';
import { SallesApp } from './components/SallesApp';
import '../css/app.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <SallesApp />
  </React.StrictMode>
);
