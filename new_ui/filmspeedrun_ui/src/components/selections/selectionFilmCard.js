import React from "react";
import Popup from "reactjs-popup";
import { FilmService } from "../../services/filmService";
import SearchResultCard from "./searchResultCard";
import './selectionFilmCard.scss'

class SelectionFilmCard extends React.Component {
    filmService = new FilmService();
    constructor(props) {
      super(props);
      this.state = {
        filmList: []
      };
      this.search = this.search.bind(this);
    }
    render() {
        return (
          <Popup
            trigger={<div className="posterBackground">
                        <button className="posterPlus">+</button>
                    </div>}
            position='top center'
            nested>
              <div className="popup-menu selSearchBox">
                <input type='text' onChange={ title => this.search(title.target.value) }></input>
                <div class="filmSearchResult">
                  {
                    this.state.filmList.map(film =>{ return(<SearchResultCard poster={film.image} title={film.title}></SearchResultCard>)})
                  }
                </div>
              </div>
          </Popup>
            
        )
    }
    search(title) {
      this.filmService.search(title).then(result => {
        console.log(title)
        console.log(result)
        this.setState({
          filmList: result
        })
        console.log(this.state.filmList)
      });
    }
}

export default SelectionFilmCard;