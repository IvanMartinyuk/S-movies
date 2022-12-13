import React, { useRef } from 'react'
import Popup from 'reactjs-popup';
import './addFilmCard.scss'

class SearchResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: props.poster,
            title: props.title,
            id: props.id,
            newSelectionComponent: props.newSelectionComponent,
            reff: props.reff
        };
        this.addFilm = this.addFilm.bind(this);
    }
    render() {
        
        return(
            <Popup trigger={<div className="flex filmNameSearchResult popup-item">
                                <div className="selSearchName">{ this.state.title }</div>
                                <button className="filmPlus" onClick={() => 
                                {
                                    this.addFilm();
                                }
                                }>+</button>
                            </div>}
                position='right center'
                on={['hover']}
                closeOnDocumentClick>
                <div className="selSearchPoster popup-menu">
                    <img src={ this.state.poster }></img>
                </div>
            </Popup>
        )
    }
    addFilm() {
        this.state.newSelectionComponent.appendFilm({
            id: this.state.id,
            poster: this.state.poster,
            title: this.state.title
        })
        const { reff } = this.props
        reff.current.close();
    }
}

export default SearchResultCard;