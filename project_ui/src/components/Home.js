// import { BrowserRouter as Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Index from './pages/Index';
import Login from './pages/Login';
import Registration from './pages/Registration';

export default function Home() {
    return ( 
      <Router>
          <Switch>
            <Route exact path='/' component={Index}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/registration' component={Registration}></Route>
          </Switch>
      </Router>
    );

}