import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../nav/nav";
import SelectionListPage from "../selections/SelectionListPage.js";
import FilmListPage from "../films/filmListPage.js";
import HomePage from "../home/homePage";
import PeoplePage from "../people/poeplePage";

class Main extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return(
            <div className="mainBox">
                <NavBar></NavBar>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}></Route>
                        <Route path="/films" element={<FilmListPage/>}></Route>
                        <Route path="/selections" element={<SelectionListPage/>}></Route>
                        <Route path="/people" element={<PeoplePage/>}></Route>
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default Main