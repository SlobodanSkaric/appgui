import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './commponents/App/App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { ManeMenue } from "./commponents/ManeMenue/ManeMenue";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ManeMenue></ManeMenue> 
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
