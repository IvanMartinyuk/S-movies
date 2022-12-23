import React, { useRef } from "react";
import "./filmListPage.scss";
import { FilmService } from "../../services/filmService.js";
import FilmCard from "./filmCard";
import { GenreService } from "../../services/genreService";
import Popup from "reactjs-popup";
import { ActorService } from "../../services/actorService";
import { WriterService } from "../../services/writerService";
import { DirectorService } from "../../services/directorService";

class FilmListPage extends React.Component {
  filmService = new FilmService();
  actorService = new ActorService();
  directorService = new DirectorService();
  writerService = new WriterService();
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      selectedPage: 0,
      pageCount: 1,
      paginations: [],
      genres: [],
      isFilter: false,
      options: '',
      oldestDate: new Date('01.01.1990'),
      isDecreace: true,
      actors: [],
      selectedActorId: 0,
      directors: [],
      selectedDirectorId: 0,
      writers: [],
      selectedWriterId: 0,
      actorRef: props.actorRef,
      directorRef: props.directorRef,
      writerRef: props.writerRef
    };
    this.updateState = this.updateState.bind(this);
  }
  render() {
    return (
      <div className="listPage">
        <div className="filterBox">
          <div className="list flex-center comboBoxList filter">
            <div className="option">
              <div className="optionTitle">Genre</div>
                <select id='genreBox'>
                  <option className="">Any</option>
                  { this.state.genres.map(genre => {
                      return( <option> { genre.name } </option> )
                  })}
                </select>
            </div>
            <div className="option">
              <div className="optionTitle">release date</div>
              <div className="flex">
                <input type='date' id="dateStart"></input>
                <div>{'->'}</div>
                <input type='date' id="dateEnd"></input>
              </div>
            </div>
            <div className="option">
              <div className="optionTitle">imdb rating</div>
              <div className="flex">
                <input type='number' 
                       max='10'
                       min='0'
                       placeholder='min'
                       defaultValue={0}
                       className="ratingInput ratingInputMin"
                       id="imdbMin"></input>
                <input type='number' 
                       max='10'
                       min='0'
                       placeholder='max'
                       defaultValue={10}
                       className="ratingInput" 
                       id="imdbMax"></input>
              </div>
            </div>
            <div className="option">
              <div className="optionTitle">local rating</div>
              <div className="flex">
                <input type='number' 
                       max='10'
                       min='0'
                       placeholder='min'
                       defaultValue={0}
                       className="ratingInput ratingInputMin"
                       id="localMin"></input>
                <input type='number' 
                       max='10'
                       min='0'
                       placeholder='max'
                       defaultValue={10}
                       className="ratingInput" 
                       id="localMax"></input>
              </div>
            </div>

            <div className="option">
                <div className="optionTitle">Sort by</div>
                <select id='sortBox'>
                  <option>Default</option>
                  <option>Release date</option>
                  <option>Imdb rating</option>
                  <option>Local rating</option>
                  <option>Title</option>
                </select>
                <button onClick={e => this.setDecreace(e) } className="decreaceBtn">-</button>
            </div>
          </div>

          <div className="list flex-center comboBoxList filter">
            <div className="option">
                <div className="optionTitle">Search</div>
                <input type='text' id="titleBox"></input>
            </div>
            <div className="option">
              <div className="optionTitle">Actor</div>
              <Popup trigger={<input type='text' id="actorBox" onInput={e => this.searchActor(e.target.value)}></input>}
                     position='bottom center'
                     ref={this.state.actorRef}
                     className="actorPopup">
                <div className="popup-menu popup-people">
                  { this.state.actors }
                </div>
              </Popup>
            </div>
            <div className="option">
              <div className="optionTitle">Writer</div>
              <Popup trigger={<input type='text' id="writerBox" onInput={e => this.searchWriter(e.target.value)}></input>}
                     position='bottom center'
                     ref={this.state.directorRef}
                     className="writerPopup">
                <div className="popup-menu popup-people">
                  { this.state.writers }
                </div>
              </Popup>
            </div>
            <div className="option">
              <div className="optionTitle">Director</div>
              <Popup trigger={<input type='text' id="directorBox" onInput={e => this.searchDirector(e.target.value)}></input>}
                     position='bottom center'
                     ref={this.state.writerRef}>
                <div className="popup-menu popup-people">
                  { this.state.directors }
                </div>
              </Popup>
            </div>
            
          </div>

          <div className="flex-center">
            <button className="filterBtn" onClick={() => this.filter()}>Filter</button>
          </div>
        </div>

        
        <div className="flex list">
          {this.state.films.map((film) => {
            return (
              <FilmCard
                film={film}
              ></FilmCard>
            );
          })}
        </div>
        <div className="flex-center pagination">
          <button className="paginationNavigate" onClick={() => this.prevPage()}>
            <div className="pagSymbol">{'<'}</div>
          </button>
          { this.state.paginations.map(pag => {return pag}) }
          <button className="paginationNavigate" onClick={() => this.nextPage()}>
            <div className="pagSymbol">{'>'}</div>
          </button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (sessionStorage.getItem("isLogin")) {
      sessionStorage.removeItem("isLogin");
      window.location.reload(false);
    }
    
    this.filmService.getPage(0).then(films => {
      this.updateState({
        films: films
      })
    });
    this.filmService.getPageCount().then(count => {
      this.updateState({
        pageCount: count,
        
      }, () => { 
        this.updateState({
          paginations: this.generatePagination()
        })
      })
    })

    let genreService = new GenreService();
    genreService.all().then(genress => {
      this.updateState({
        genres: genress
      })
    })
  }
  updateState(data, callback) {
    this.setState(data, callback);
  }
  setDecreace(e) {
    e.target.innerText = this.state.isDecreace == true ? '+' : '-';
    this.updateState({
      isDecreace: !this.state.isDecreace
    });
  }
  generatePagination() {
    let paginations = [];
    let pageLimit = 10;
    let startPage = this.state.selectedPage - 5;
    if(startPage < 0)
      startPage = 0;
    for(let i = startPage; i < startPage + pageLimit && i < this.state.pageCount; i++) {
      if(this.state.selectedPage != i)
        paginations.push(<div className="paginationItem" id={i} onClick={e => this.loadPage(e.target.id)}></div>);
      else
        paginations.push(<div className="paginationItem selectedPaginationItem" id={i} onClick={e => this.loadPage(e.target.id)}></div>);
    }
    
    return paginations;
  }
  loadPage(page) {
    let response = this.filmService.getPage(page);
    if(this.state.isFilter)
      response = this.filmService.getByFilter(this.getOptions(page));
    response.then(films => {
      this.updateState({
        films: [],
        selectedPage: page
      }, () => {
        this.updateState({
          films: films,
          selectedPage: page
        }, () => {
          this.updateState({
            paginations: []
          }, () => {
              this.updateState({
                paginations: this.generatePagination()
              });
            });
        });
      })
    })
  }
  nextPage() {
    if(this.state.pageCount > this.state.selectedPage + 1)
    {
      this.loadPage(this.state.selectedPage + 1);
    }
  }
  prevPage() {
    if(this.state.selectedPage - 1 >= 0)
    {
      this.loadPage(this.state.selectedPage - 1);
    }
  }
  getOptions(page) {
    return {
      page: page,
      genre: document.getElementById('genreBox').value == 'Any' ? '' : document.getElementById('genreBox').value,
      dateTop: document.getElementById('dateStart').value,
      dateLast: document.getElementById('dateEnd').value,
      imdbRatingTop: document.getElementById('imdbMin').value,
      imdbRatingLast: document.getElementById('imdbMax').value,
      localRatingTop: document.getElementById('localMin').value,
      localRatingLast: document.getElementById('localMax').value,
      sortBy: document.getElementById('sortBox').value,
      isDecreace: !this.state.isDecreace,
      title: document.getElementById('titleBox').value,
      actorId: this.state.selectedActorId,
      writerId: this.state.selectedWriterId,
      directorId: this.state.selectedDirectorId
    }
  }
  filter() {
    let options = this.getOptions(0);

    //changing format of sortBy
    let sort = options.sortBy;
    options.sortBy = '';    
    sort.split(' ').forEach(str => {
      options.sortBy += str.toLowerCase();
    });

    this.filmService.getByFilter(options).then(result => {
      this.updateState({
        films: [],
        pageCount: 0,
        selectedPage: 0
      }, () => {
        this.updateState({
          films: result.films,
          pageCount: result.pagesCount,
          options: options,
          isFilter: true
        })
      })
    })
  }
  searchActor(name) {
    if(this.state.selectedActorId != 0)
      this.updateState({
        selectedActorId: 0
    })
    this.actorService.search(name).then(result => {
      this.updateState({
        actors: []
      }, () => {
        let actors = []
        result.forEach(item => {
            actors.push(
              <div>
                <button className="popup-name noneBtn" id={ item.id } onClick={e => {
                  this.state.actorRef.current.close();
                  document.getElementById('actorBox').value = e.target.innerText;
                  this.updateState({
                    selectedActorId: e.target.id
                  })
                }}>{ item.name }</button>
              </div>
            )
        })
        this.updateState({
          actors: actors
        })
      })
    })
  }
  searchDirector(name) {
    if(this.state.selectedDirectorId != 0)
      this.updateState({
        selectedDirectorId: 0
    })
    this.directorService.search(name).then(result => {
      this.updateState({
        directors: []
      }, () => {
        let directors = []
        result.forEach(item => {
            directors.push(
              <div>
                <button className="popup-name noneBtn" id={ item.id } onClick={e => {
                  this.state.directorRef.current.close();
                  document.getElementById('directorBox').value = e.target.innerText;
                  this.updateState({
                    selectedDirectorId: e.target.id
                  })
                }}>{ item.name }</button>
              </div>
            )
        })
        this.updateState({
          directors: directors
        })
      })
    })
  }
  searchWriter(name) {
    if(this.state.selectedWriterId != 0)
      this.updateState({
        selectedWriterId: 0
    })
    this.writerService.search(name).then(result => {
      this.updateState({
        writers: []
      }, () => {
        let writers = []
        result.forEach(item => {
            writers.push(
              <div>
                <button className="popup-name noneBtn" id={ item.id } onClick={e => {
                  console.log(document.getElementsByClassName('writerPopup-content')[0].style.display = 'none');
                  this.state.writerRef.current.close();
                  document.getElementById('writerBox').value = e.target.innerText;
                  this.updateState({
                    selectedWriterId: e.target.id
                  })
                }}>{ item.name }</button>
              </div>
            )
        })
        this.updateState({
          writers: writers
        })
      })
    })
  }
}

export default function(props) {
  const actorRef = useRef();
  const directorRef = useRef();
  const writerRef = useRef();
  return <FilmListPage {...props} 
                        actorRef={actorRef}
                        directorRef={directorRef}
                        writerRef={writerRef}></FilmListPage>
}