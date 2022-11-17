import React from "react"
import './nav.css'
import logo from './try13.png'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <nav className="navbar">
            <div className="logoDiv">
                <img src={logo} className="logo" ></img>
            </div>
            <div className="navigation">Films</div>
            <div className="navigation selected">Selections</div>
            <div className="navigation">People</div>
        </nav>
        )
    }
}

export default NavBar