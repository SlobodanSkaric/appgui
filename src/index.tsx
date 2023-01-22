import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { MainMenuItem, ManeMenue } from "./commponents/ManeMenue/ManeMenue";
import { BrowserRouter,  Switch } from 'react-router-dom';
import { Route } from "react-router"
import HomePage from './commponents/HomePage/HomePage';
import ContactPage from './commponents/ContanctPage/ContactPage';
import LoginPage from './commponents/LoginPage/LoginPage';
import CategoryPage from './commponents/CategoryPage/CategoryPage';

const menuItems = [
  new MainMenuItem("Home", "/"),
  new MainMenuItem("AboutAs", "aboutas"),
  new MainMenuItem("Contact", "/page/contact/"),
  new MainMenuItem("Login", "/user/login/"),

  new MainMenuItem("Cat1", "/category/1/"),
  new MainMenuItem("Cat7", "/category/7/"),
  new MainMenuItem("Cat17", "/category/17/"),
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ManeMenue items={ menuItems }/>
      
                      <Switch>   
                              <Route exact  path="/" component={ HomePage } /> 
                              <Route path="/page/contact" component={ ContactPage } />
                              <Route path="/user/login" component={ LoginPage }/>
                              <Route exact path="/category/:id" component={ CategoryPage }/>
                      </Switch>
      
    </React.StrictMode>
  </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
