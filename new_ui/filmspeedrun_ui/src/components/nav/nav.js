import React from "react"
import './nav.scss'
import logo from './logo.png'
import Popup from 'reactjs-popup';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.exit = this.exit.bind(this);        
        this.state = {
            userName: sessionStorage.getItem("username")
        }
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
                <div className="userNick">{ this.state.userName }</div>
                <Popup
                    trigger={
                        <a className="userImgDiv" href="/signin">
                            <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" className="userImg"></img>
                        </a>
                    }
                    position='bottom right'
                    on={['hover']}
                    arrow='bottom right'
                >
                    <div className="popup-menu">
                        <div>
                            <a href="/hh" id="skipSelection"></a>
                        </div>
                        <div className="popup-item">
                            <a className="popup-link" href="/newselection">New selection</a>
                        </div>
                        <div className="popup-item">
                            <a className="popup-link" href="/signin">Sign in</a>
                        </div>
                        <div className="popup-item">
                            <a className="popup-link" href="/signup">Sign up</a>
                        </div>
                        <div className="popup-item">
                            <a className="popup-link" onClick={() => this.exit()}>Exit</a>
                        </div>
                    </div>
                </Popup>
                
            </div>
        </nav>
        )
    }
    setSelected() {
        let links = document.getElementsByTagName("a");        
        for(let i = 0; i < links.length; i++)
            if(links[i].href === window.location.href && !links[i].classList.contains("userImgDiv"))
                    links[i].classList.add("selected");
                    
    }

    exit() {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('accessToken');
        this.setState({
            userName: ""
        })
    }
}

export default NavBar