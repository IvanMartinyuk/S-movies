// import { BrowserRouter as Route } from 'react-router-dom';
import React from 'react';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Index from './pages/Index';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { userService } from "../services/userService"
import NavBar from './NavBar';
import { withRouter } from "react-router";
import Logout from './pages/Logout';
class Home extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.state = {
     
      }
     
    
  }
  render(){
    return ( <>
      <Router>
          <Switch>
            <Route exact path='/' component={() =><Index ></Index>} ></Route>
            <Route path='/login' component={Login}></Route> 
            <Route path='/logout' component={Logout}></Route> 
            <Route path='/registration' component={Registration}></Route>
          </Switch>
      </Router></>
    );
  }
    

}
export default Home;