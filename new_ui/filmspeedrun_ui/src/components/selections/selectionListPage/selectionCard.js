import React from 'react'
import { SelectionService } from '../../../services/selectionService';
import FilmCard from '../../films/filmCard'
import './selectionCard.scss'

class SelectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            poster: props.poster,
            description: props.description,
            films: []
        }

    }
    render() {
        return (
            <div className='selectionCard'>
                <div className='flex' onClick={ () => this.fullInfo() }>
                    <div className='selPoster'>
                        <img src={ this.state.poster } className='selPosterImg'></img>
                    </div>
                    <h3 className='selNameTitle'>{ this.state.name }</h3>
                    <button className='selNameTitle' id={ 'selRotateBtn' + this.state.id }>{ '>' }</button>
                </div>
                <div className='flex-center'>
                    <div className='selInfoBox' id={ 'selInfoBox' + this.state.id }>
                        {this.state.description}
                    </div>
                </div>
                <div className='selFilmSmallBox'>
                    {this.state.films}
                </div>
            </div>
        )
    }
    componentDidMount() {
        let selectionService = new SelectionService();
        selectionService.GetFilms(this.state.id).then(films => {
            let filmViews = []
            films.forEach(film => {
                filmViews.push(
                    <FilmCard film={film}></FilmCard>
                )
            });
            this.setState({
                films: filmViews
            })
        })
    }
    fullInfo() {
        let descriptionElement = document.getElementById('selInfoBox' + this.state.id);
        let rotateBtn = document.getElementById('selRotateBtn' + this.state.id );
        if(descriptionElement.style.display == 'block')
        {
            descriptionElement.style.display = 'none';
            rotateBtn.style.rotate = '0deg';
        }
        else
         {
            descriptionElement.style.display = 'block';
            rotateBtn.style.rotate = '90deg';
         }  
    }
}

export default SelectionCard;