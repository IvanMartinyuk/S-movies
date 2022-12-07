import React from 'react'
import Popup from 'reactjs-popup';
import './selectionFilmCard.scss'

class SearchResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: props.poster,
            title: props.title
        }
    }
    render() {
        return(
            <Popup trigger={<div className="flex">
                                <div className="selSearchName">{ this.state.title }</div>
                                <button className="filmPlus">+</button>
                            </div>}
                position='right center'
                on={['hover']}>
                <div className="selSearchPoster popup-menu">
                    <img src={ this.state.poster }></img>
                </div>
            </Popup>
        )
    }
}

export default SearchResultCard;