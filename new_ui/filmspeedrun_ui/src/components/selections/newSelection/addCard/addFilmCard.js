import React, { useRef } from "react";
import Popup from "reactjs-popup";
import { FilmService } from "../../../../services/filmService";
import SearchResultCard from "./searchResultCard";
import './addFilmCard.scss'

class AddFilmCard extends React.Component {
    filmService = new FilmService();
    constructor(props) {
      super(props);
      this.state = {
        filmList: [],
        newSelectionComponent: props.newSelectionComponent
      };
      this.search = this.search.bind(this);
      this.getFilm = this.getFilm.bind(this);
    }
    render() {
        const { reff } = this.props;
        return (
          <Popup
            ref={reff}
            trigger={<div className="posterBackground">
                        <button className="posterPlus">+</button>
                    </div>}
            position='top center'
            nested>
              <div className="popup-menu selSearchBox">
                <input type='text' onChange={ title => this.search(title.target.value) }></input>
                <div class="filmSearchResult">
                  {
                    this.state.filmList.map(film =>{ return this.getFilm(film) })
                  }
                </div>
              </div>
          </Popup>
            
        )
    }
    search(title) {
      this.filmService.search(title).then(result => {
        this.setState({
          filmList: []
        }, () => {
          this.setState({
                    filmList: result
                  })
        })
      });
    }
    getFilm(film) {
      const { reff } = this.props;
      return(<SearchResultCard poster={film.image} 
        title={film.title}
        id={film.id}
        newSelectionComponent={this.state.newSelectionComponent}
        reff={reff}></SearchResultCard>);
    }
}

export default function(props) {
  const reff = useRef();
  return <AddFilmCard {...props} reff={reff}></AddFilmCard>
}