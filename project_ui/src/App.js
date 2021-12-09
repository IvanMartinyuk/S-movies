import NavBar from "./components/NavBar";
import React from "react";
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from "./components/Home";

class App extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.state = {
      mas: this.check()
     
      }
   
    this.changeLogin = this.changeLogin.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.c = this.c.bind(this)
    
  }
  c(){
    sessionStorage.setItem("isLogin",false)
  }
  check(){
    if(sessionStorage.getItem("isLogin")){
     
        return (<div className=" dropdown dropstart" >
        <a className="nav-link  userb"style={{color:"white"}} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          
        </a>
        <ul className="dropdown-menu dropdown-menu-dark dm" aria-labelledby="navbarDropdown">
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><a className="dropdown-item" href="#">Saved</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" onClick={this.c}>Log out</a></li>
        </ul>
      </div>)
      
    }
    else{
     return (<div className=" dropdown dropstart" >
        <a className="nav-link  userb"style={{color:"white"}} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          
        </a>
        <ul className="dropdown-menu dropdown-menu-dark dm" aria-labelledby="navbarDropdown">
          <li><a className="dropdown-item" href="Login">Login</a></li>
          <li><a className="dropdown-item" href="Registration">Register</a></li>
        </ul>
      </div>)
      
     
    }
  }
  changeLogin(){
    this.setState(()=>{
      return {mas: this.check()}
    })
  }
  componentDidUpdate(){
    this.setState(()=>{
      return {mas: this.check()}
    })
  }
  render(){
    return (
     
      <div className="App">
      <header className="App-header">
      <NavBar th={this} mas={this.state.mas} ></NavBar>
      </header>
    
      <Home></Home>


  

    </div>
    );
  }
    

}
export default App;

