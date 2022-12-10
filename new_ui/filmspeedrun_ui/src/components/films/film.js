import React from 'react'
import { FilmService } from '../../services/filmService';
import './film.scss'

class Film extends React.Component {
    filmService = new FilmService();
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.pathname.split('/')[2],
            poster: '',
            title: '',
            imdbRating: 0.0,
            localRating: 0.0,
            screenshots: [],
            choosedScreenshot: 0,
            choosedIndex: 0,
            description: '',
            genres: [],
            actors: [],
            writers: [],
            directors: []
        };
        this.getFilmInfo = this.getFilmInfo.bind(this);
    }
    render() {
        return (
            <div className='flex filmBox'>
                <div className='posterCol'>
                    <div className='filmPosterDiv'>
                        <img src={this.state.poster}></img>
                    </div>
                    <h2>{this.state.title}</h2>
                    <div className='ratingBox'>
                        <div className='ratingCard'>
                            <b className='ratingName'>Imdb</b>
                            <div className='flex'>
                                <b className='rating'>{this.state.imdbRating}</b>
                                <div className='starDiv'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAErElEQVRogd2ZX2gcVRTGv9vEJjZp0lSrkLZSBG2JxQepRS1SNRFTHwzVGhC1aqp98s9jQSr4JEWfBH3wD1ZtIZKCUEXEaKsJVMQHqwXbVJGKxEYNmjRJ07TZ7s+HOctM1t2d2e2dbPDAMLv3nvt937lz595z70j/E3NpggOLJB02njudc9k0+VIzoIPQOqqtp2IDeiOB9FZbT0UGLAfOARm7ZoAr0uJblBawpEck1Uvql/S5pDpJD6fIl44BR21IPQBss9/Hqq2rLAM2mPBRoA5YDPxpZRvS4ExraO2w+3vOufPOuQuS9ufVLWwDLgfGrPfbIuXrgCwwDiyppsZEBmy3II4UqPva6rZXQ1tZBgyY2J4CdTusbqAa2hIbcL0Nn0lgaYH6RmDCglnnk9v3y96jIK/6wDk3mV/pnJuS1Gd/H/PM7ceAWuB36+1bSvjdaj5/AJfNp8ZEBnSZwBMJfH803/t88fscWrn14a0Evu/ktblkS7QfsXm/QdJSScskNdrVIKlFUrOklyRlJa1yzo3G4K2QNKygI5+XdEbSmKSzkqbsGpc0Kemsc246NhDgUUntJqxZUlNEZJOVJX1yB5xz3UkcgQOStiXEzSoIdkJhsBNWNiXpkAP+krQiBmimQONoz01Z+ZvOuZGEgbRKekpBRzVq7pPO79T6GLhRAZ2WNmBzfDewHlgDtAA1SYSlaUCNaVlj2roj69E40JlzvA44HslY76iy9qIG3AaMmNafo/lczqEJ+MgcZoGnq6S1qAFPAudN42dASzHHGmAPob2xEBYtW2zzddUmafgQMG2NBoGr5kFvMS3LgS9MywzwRLkANwG/GcAvwPqUtJbSsBYYMg2nKZH6xAG1At8Y0CSw1bPWUtz3RmbT74BrLhWwDthrgFkbq6mdvgAO2AVcNM5efO4ogZ02mwH0AQ3ewEOOemCfcWSAXb45ckRbCPfjR4HVHrFXEx4hjQFbfGEXI4y+gHs94r5rmEPA2nLblz3WnXMnFZwcStKv5bYvYafs3m8c6Rtwwnpvk0fMTYZ53BdmHGGrEU7gcdUnWL3PGPaqcttXMo3ebfcB59xsBe0LmnMuI2nQ/t5VbvtKAmm3+6EK2sZZDrO9pJcPA4bt8XtPWQj2GhCcxqT3WRBoM6KRJEQ2VX9qV+yBnK3qp42jLc6/YgOeNZJ9MX61lmacI7QLBOnN4pi2+83/Gb/q55IcNJKiqTSwEfjB/LLA23ZlrewYsLFE+8fN72BaQdQSZqP/SU0IPifsIciRIEj9OyL1t0fWn4sEm6PGAjgr05jeowS5o86hAnWbgZ+sfhZ4lQJJpQX7IuF29RRwTwG/k1Zf2f4jJpAXDPy1SNky69ncsPkeuDkB1o3At5H3pw+4MlL/upXvTiOQrwx8q/1/kPC74LT1dOKhYEP1OYING8DfwE6ru9/KvvQdxBKC/XIGuAH4MNKbg1SQrUawrwX6I3if2BPL2BD0t+8hOMTL9XzuYOwfoAcPCxfB+tFjmBhH7vCj00cMOaJXmGsfAyu9EYQ8VwPv53G97JPgsIEOA13egIvzdRGmQv5yOoLpdTfQ7A00nrPZODfPF+eCsH8B32vGCz3sjskAAAAASUVORK5CYII="/>
                                </div>
                            </div>
                        </div>
                        <div className='ratingCard'>
                            <b className='ratingName'>Local</b>
                            <div className='flex'>
                                <b className='rating'>{this.state.localRating}</b>
                                <div className='starDiv'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAErElEQVRogd2ZX2gcVRTGv9vEJjZp0lSrkLZSBG2JxQepRS1SNRFTHwzVGhC1aqp98s9jQSr4JEWfBH3wD1ZtIZKCUEXEaKsJVMQHqwXbVJGKxEYNmjRJ07TZ7s+HOctM1t2d2e2dbPDAMLv3nvt937lz595z70j/E3NpggOLJB02njudc9k0+VIzoIPQOqqtp2IDeiOB9FZbT0UGLAfOARm7ZoAr0uJblBawpEck1Uvql/S5pDpJD6fIl44BR21IPQBss9/Hqq2rLAM2mPBRoA5YDPxpZRvS4ExraO2w+3vOufPOuQuS9ufVLWwDLgfGrPfbIuXrgCwwDiyppsZEBmy3II4UqPva6rZXQ1tZBgyY2J4CdTusbqAa2hIbcL0Nn0lgaYH6RmDCglnnk9v3y96jIK/6wDk3mV/pnJuS1Gd/H/PM7ceAWuB36+1bSvjdaj5/AJfNp8ZEBnSZwBMJfH803/t88fscWrn14a0Evu/ktblkS7QfsXm/QdJSScskNdrVIKlFUrOklyRlJa1yzo3G4K2QNKygI5+XdEbSmKSzkqbsGpc0Kemsc246NhDgUUntJqxZUlNEZJOVJX1yB5xz3UkcgQOStiXEzSoIdkJhsBNWNiXpkAP+krQiBmimQONoz01Z+ZvOuZGEgbRKekpBRzVq7pPO79T6GLhRAZ2WNmBzfDewHlgDtAA1SYSlaUCNaVlj2roj69E40JlzvA44HslY76iy9qIG3AaMmNafo/lczqEJ+MgcZoGnq6S1qAFPAudN42dASzHHGmAPob2xEBYtW2zzddUmafgQMG2NBoGr5kFvMS3LgS9MywzwRLkANwG/GcAvwPqUtJbSsBYYMg2nKZH6xAG1At8Y0CSw1bPWUtz3RmbT74BrLhWwDthrgFkbq6mdvgAO2AVcNM5efO4ogZ02mwH0AQ3ewEOOemCfcWSAXb45ckRbCPfjR4HVHrFXEx4hjQFbfGEXI4y+gHs94r5rmEPA2nLblz3WnXMnFZwcStKv5bYvYafs3m8c6Rtwwnpvk0fMTYZ53BdmHGGrEU7gcdUnWL3PGPaqcttXMo3ebfcB59xsBe0LmnMuI2nQ/t5VbvtKAmm3+6EK2sZZDrO9pJcPA4bt8XtPWQj2GhCcxqT3WRBoM6KRJEQ2VX9qV+yBnK3qp42jLc6/YgOeNZJ9MX61lmacI7QLBOnN4pi2+83/Gb/q55IcNJKiqTSwEfjB/LLA23ZlrewYsLFE+8fN72BaQdQSZqP/SU0IPifsIciRIEj9OyL1t0fWn4sEm6PGAjgr05jeowS5o86hAnWbgZ+sfhZ4lQJJpQX7IuF29RRwTwG/k1Zf2f4jJpAXDPy1SNky69ncsPkeuDkB1o3At5H3pw+4MlL/upXvTiOQrwx8q/1/kPC74LT1dOKhYEP1OYING8DfwE6ru9/KvvQdxBKC/XIGuAH4MNKbg1SQrUawrwX6I3if2BPL2BD0t+8hOMTL9XzuYOwfoAcPCxfB+tFjmBhH7vCj00cMOaJXmGsfAyu9EYQ8VwPv53G97JPgsIEOA13egIvzdRGmQv5yOoLpdTfQ7A00nrPZODfPF+eCsH8B32vGCz3sjskAAAAASUVORK5CYII="/>
                                </div>
                            </div>
                        </div>
                        <div className='voting'>
                            <h3 className='voteText'>Your vote:</h3>
                            <input type='range' defaultValue='3' mix='0' max='10' id='vote'></input>
                            <button className='voteBtn' onClick={() => this.vote()}>Vote!</button>
                        </div>
                    </div>
                </div>
                <div className='vertivalLine'></div>
                <div className='contentCol'>
                    <button className='navigateImg' onClick={() => {
                                        if(this.state.choosedIndex > 0)
                                            this.setState({
                                                choosedScreenshot: this.state.screenshots[this.state.choosedIndex - 1],
                                                choosedIndex: this.state.choosedIndex - 1
                                            })}
                                    }>{ "<" }</button>  
                    <div className='contentBox'>
                        <div className='screenshotBlock'>
                            
                            <div className='choosedScreenshot'>
                                <img src={ this.state.choosedScreenshot } className="choosedImg"></img>
                            </div>
                            
                        </div>
                        
                        <div className='detalBox flex'>
                            <div className='castBox flex'>
                                <div className='detailTable'>
                                    <div className='row'>
                                        <div className='cell'>Genres:</div>
                                        <div>{this.detalItem(this.state.genres)}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='cell'>Actors:</div>
                                        <div>{this.detalItem(this.state.actors)}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='cell'>Directors:</div>
                                        <div>{this.detalItem(this.state.directors)}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='cell'>Writers:</div>
                                        <div>{this.detalItem(this.state.writers)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='descriptionText'>
                                { this.state.description }
                            </div>
                        </div>

                    </div>

                    <button className='navigateImg' onClick={() => {
                                    if(this.state.choosedIndex < this.state.screenshots.length - 1)
                                        this.setState({
                                            choosedScreenshot: this.state.screenshots[this.state.choosedIndex + 1],
                                            choosedIndex: this.state.choosedIndex + 1
                                        })}
                                }>{ ">" }</button>
                </div>
            </div>
        )
    }
    vote() {
        let vote = document.getElementById('vote').value;
        this.filmService.vote(vote, this.state.id).then(() => window.location.reload(false));

    }
    detalItem(items) {
        return (
            <div className="detailItem">
                <div className='detailDetails'>{ items.map((item) => { 
                                            if (items.indexOf(item) == 0)
                                                return item.name
                                            else
                                                return  ", " + item.name}) }</div>
            </div>
        )
    }
    getFilmInfo() {        
        this.filmService.getFilm(this.state.id).then(film => {            
            this.setState({
                poster: film.image,
                title: film.title,
                imdbRating: film.imdbRating,
                localRating: film.localRating,
                description: film.description
            })
        })
        this.filmService.getScreenshots(this.state.id).then(screenshots => {
            this.setState({
                screenshots: screenshots,
                choosedScreenshot: screenshots[0],
                choosedIndex: 0
            })
        })
        this.filmService.getGenres(this.state.id).then(genres => {
            this.setState({
                genres: genres
            })
        })
        this.filmService.getActors(this.state.id).then(actors => {
            this.setState({
                actors: actors
            })
        })
        this.filmService.getWriters(this.state.id).then(writers => {
            this.setState({
                writers: writers
            })
        })
        this.filmService.getDirectors(this.state.id).then(directors => {
            this.setState({
                directors: directors
            })
        })
    }
    componentDidMount() {
        this.getFilmInfo();
    }
}

export default Film;