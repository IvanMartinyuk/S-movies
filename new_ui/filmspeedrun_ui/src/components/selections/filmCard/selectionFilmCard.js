import React from 'react'
import './selectionFilmCard.scss'

class SelectionFilmCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            poster: props.poster
        }
    }
    render() {
        return (
            <div className='selFilmCard'>
                <div className='selFilmPosterDiv'>
                    <img src={ this.state.poster } className="selFilmPoster"></img>
                </div>
                <h3 className='selFilmTitle'>{ this.state.title }</h3>
            </div>
        )
    }
}

export default SelectionFilmCard;