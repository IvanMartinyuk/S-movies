import React from "react"
import './nav.scss'
import logo from './logo.png'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.setSelected(); 
    }
    render() {
        return (
        <nav className="navbar flex">
            <div className="logoDiv">
                <img src={logo} className="logo" ></img>
            </div>
            <div className="flex">
                <a className="navigation" href="/">Home</a>
                <a className="navigation" href="/films">Films</a>
                <a className="navigation" href="/selections">Selections</a>
                <a className="navigation" href="/people">People</a>
            </div>
            <div className="userDiv flex">
                <div className="userNick">user_name</div>
                <div className="userImgDiv">
                    <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" className="userImg" ></img>
                </div>
            </div>
        </nav>
        )
    }
    setSelected() {
        let links = document.getElementsByTagName("a");
        for(let i = 0; i < links.length; i++)
            if(links[i].href === window.location.href)
                    links[i].classList.add("selected");
    }
}

export default NavBar