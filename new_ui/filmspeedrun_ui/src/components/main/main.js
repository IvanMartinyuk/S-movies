import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../nav/nav";
import SelectionsPage from "../selections/SelectionsPage";

class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <>
                <NavBar></NavBar>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<SelectionsPage/>}></Route>
                    </Routes>
                </Router>
                
            </>
        )
    }
}

export default Main