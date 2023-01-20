import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { MainMenuItem, ManeMenue } from "./commponents/ManeMenue/ManeMenue";
import HomePage from './commponents/HomePage/HomePage';
import { HashRouter,Route,Routes } from 'react-router-dom';
import ContactPage from './commponents/ContanctPage/ContactPage';
import LoginPage from './commponents/LoginPage/LoginPage';

const menuItems = [
  new MainMenuItem("Home", "/"),
  new MainMenuItem("AboutAs", "/aboutas"),
  new MainMenuItem("Contact", "/contact"),
  new MainMenuItem("Login", "/login"),
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ManeMenue items={ menuItems }></ManeMenue> 
    <HashRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/login' element={ < LoginPage /> } />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
