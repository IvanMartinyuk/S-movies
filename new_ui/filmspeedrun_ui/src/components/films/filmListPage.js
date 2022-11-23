import React from "react"
import './filmListPage.scss'
import {FilmService} from '../../services/filmService.js'
import FilmCard from "./filmCard";

class FilmListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
        this.updateState = this.updateState.bind(this)
    }
    componentDidMount() {
        let filmService = new FilmService();
        filmService.GetPage(0).then(x => {
            this.updateState({
                films: x
            })
        })
    }
    updateState(x) {
        this.setState(x);
    }
    render() {
        return (
            <div className="flex filmPage">
                <div className="flex filmList">
                    {this.state.films.map((film) => {
                        return (
                            <FilmCard image={film.image} title={film.title}></FilmCard>
                        )
                    })}
                </div>
                
            </div>
        )
    }
}

export default FilmListPage;