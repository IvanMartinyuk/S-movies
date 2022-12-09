import React from "react";
import './newSelection.scss'
import AddFilmCard from "./addCard/addFilmCard";
import SelectionFilmCard from "./filmCard/selectionFilmCard";
import { UserService } from "../../services/userService";
import { SelectionService } from "../../services/selectionService";
import { normalizePathname } from "@remix-run/router";

class NewSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            component: this,
            poster: 'https://m.media-amazon.com/images/M/MV5BMDI1NWM1ZDItNDFhMi00YWRhLTg1YzItNTNhY2M2N2QzY2FkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6762_AL_.jpg'
        }
        this.createSelection = this.createSelection.bind(this);
    }
    componentDidMount() {
        if(sessionStorage.getItem('isSelCreated'))
        {
            sessionStorage.removeItem('isSelCreated');
            document.getElementById('selCreated').classList.remove('unvisible')
            setTimeout(() => document.getElementById('selCreated').classList.add('unvisible'), 3000);
        }
    }
    render() {
        return (
            <div>
                <div className="flex-center">
                    <div className="registered unvisible" id="selCreated">selection is created</div>
                </div>
                <div className="mainInfoBox">
                    <div className="selPosterDiv">
                        <img src={this.state.poster}
                             className="selPosterImg"></img>
                        <div className="flex">
                            <div>
                                <div className="selName">Image: </div>
                                <div className="selName">Name: </div>
                            </div>
                            <div>
                                <input type='text' className="selNameTextBox" id="selUrl" onInput={e => this.changePoster(e.target.value)}></input>
                                <input type='text' className="selNameTextBox" id="selName"></input>
                                <div className="error unvisible" id="nameError">name requested</div>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <div className="descTitle">Description</div>
                        <div className="textAreaDiv">
                            <textarea className="selectionDescription" id="selDesc"></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="descTitle">Films</h2>
                    <div className="selectionFilmBox">
                        {
                            this.state.films.map(film => { return (<SelectionFilmCard title={film.title}
                                                                                      poster={film.poster}></SelectionFilmCard>)})
                        }
                        <AddFilmCard newSelectionComponent={this.state.component}></AddFilmCard>
                    </div>
                </div>
                <div className="flex-center">
                    <button className="selCreateBtn" onClick={() => this.createSelection()}>Create</button>
                </div>
            </div>
        )
    }
    appendFilm(film) {
        let array = this.state.films;
        array.push(film);
        this.setState({
            films: array
        })
    }
    changePoster(url) {
        this.setState({
            poster: url
        })
    }
    createSelection() {
        let selection = {
            name: document.getElementById('selName').value,
            userId: sessionStorage.getItem('userId'),
            rating: 0,
            ratingVotes: 0,
            poster: this.state.poster,
            description: document.getElementById('selDesc').value
        }
        if(selection.name.length == 0)
            document.getElementById('nameError').classList.remove('unvisible')
        else {
            let selService = new SelectionService();
            selService.create(selection).then(response => 
                {
                    let ids = [];
                    this.state.films.forEach(film => ids.push(film.id));
                    selService.addFilms(response.id, ids);
                    sessionStorage.setItem('isSelCreated', 'true');
                    window.location.reload(false);
                })    
        }
    }
}

export default NewSelection;