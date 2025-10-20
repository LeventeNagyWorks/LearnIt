import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

// Set baseURL based on environment
const isDev =
  window.location.hostname === 'localhost' &&
  (window.location.port === '3000' || window.location.port === '5173');

axios.defaults.baseURL = isDev
  ? 'http://localhost:3001'
  : window.location.origin;

console.log('Axios default baseURL set to:', axios.defaults.baseURL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
