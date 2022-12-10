import React from "react";
import "./filmListPage.scss";
import { FilmService } from "../../services/filmService.js";
import FilmCard from "./filmCard";

class FilmListPage extends React.Component {
  filmService = new FilmService();
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      selectedPage: 0,
      pageCount: 1,
      paginations: []
    };
    this.updateState = this.updateState.bind(this);
  }
  render() {
    return (
      <div className="listPage">
        <div className="flex list">
          {this.state.films.map((film) => {
            return (
              <FilmCard
                image={film.image}
                title={film.title}
                id={film.id}
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
        films: films,
      });
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
  }
  updateState(data, callback) {
    this.setState(data, callback);
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
        paginations.push(<div className="paginationItem selecteedPaginationItem" id={i} onClick={e => this.loadPage(e.target.id)}></div>);
    }
    
    return paginations;
  }
  loadPage(page) {
    this.filmService.getPage(page).then(films => {
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
      });
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
}

export default FilmListPage;
