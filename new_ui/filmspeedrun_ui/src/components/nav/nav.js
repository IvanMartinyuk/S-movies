import React from "react"
import './nav.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <nav className="navbar">
            <div className="logoDiv">
                {/* <img className="logo"></img> */}
            </div>
            <div className="navigation">Films</div>
            <div className="navigation selected">Selections</div>
            <div className="navigation">People</div>
        </nav>
        )
    }
}

export default NavBar