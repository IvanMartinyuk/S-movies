import React from 'react'
import { SelectionService } from "../../services/selectionService";
import './selectionSearchCard.scss'

class SelectionSearchCard extends React.Component {
    selectionService = new SelectionService();
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            filmId: props.filmId
        }
    }
    render() {
        return(
            <div className='popup-item flex-center'>
                <button className='selNameBtn'
                        onClick={() => { this.addFilmToSelection() }}>
                    { this.state.name }
                </button>
                <div className='green ok unvisible' id={'isFilmAdded' + this.state.id}>ok</div>
            </div>
        )
    }
    addFilmToSelection() {
        document.getElementById('isFilmAdded' + this.state.id).classList.add('unvisible');
        let ids = [];
        ids.push(this.state.filmId);
        this.selectionService.addFilms(this.state.id, ids).then(resp => {
            if(resp.ok)
                document.getElementById('isFilmAdded' + this.state.id).classList.remove('unvisible');
        });
    }
}

export default SelectionSearchCard;