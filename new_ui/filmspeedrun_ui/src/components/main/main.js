import React from "react";
import NavBar from "../nav/nav"
import MainPage from "../mainPage/MainPage"

class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <>
                <NavBar></NavBar>
                <MainPage></MainPage>
            </>
        )
    }
}

export default Main