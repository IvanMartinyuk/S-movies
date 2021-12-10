// import { BrowserRouter as Route } from 'react-router-dom';
import React from 'react';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Index from './pages/Index';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Film from './pages/Film';
import './css/index.css'
import Actor from './pages/Actor';
import Directors from './pages/Directors';
import Producer from './pages/Producer';
import Popular from './pages/Popular';
import Selection from './pages/Selections';
import Lists from './pages/Lists';
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
            <Route path='/lists' component={Lists}></Route> 
            <Route path='/registration' component={Registration}></Route>
            <Route path='/actors/:id' component={Actor}></Route>
            <Route path='/directors/:id' component={Directors}></Route>
             <Route path='/producers/:id' component={Producer}></Route>
             <Route path='/Populars' component={Popular}></Route>
             <Route path='/selections/:id' component={Selection}></Route> 
            <Route path="/films/:id" component={Film}/> 
            </Switch>
      </Router></>
    );
  }
    

}
export default Home;