import React from 'react'
import { SelectionService } from '../../../services/selectionService';
import SelectionCard from './selectionCard';
import './selectionListPage.scss'

class SelectionListPage extends React.Component {
    selectionService = new SelectionService();
    constructor(props) {
        super(props);
        this.state = {
            selections: [],
            selectedPage: 0,
            paginations: [],
            pageCount: 2
        }
        this.updateState = this.updateState.bind(this);
    }
    render() {
        return (
            <div>
                <div className='list'>
                    {
                        this.state.selections.map(sel => {
                            return <SelectionCard name={sel.name}
                                                id={sel.id}
                                                poster={sel.poster}
                                                description={sel.description}></SelectionCard>
                        })
                    }
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
        )
    }
    componentDidMount() {
        this.selectionService.GetTop(0).then(selections => {
            this.setState({
                selections: selections
            })
        })
        this.selectionService.getPageCount().then(count => {
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
            paginations.push(<div className="paginationItem selectedPaginationItem" id={i} onClick={e => this.loadPage(e.target.id)}></div>);
        }
        
        return paginations;
    }
    loadPage(page) {
        this.selectionService.GetTop(page).then(selections => {
          this.updateState({
            selections: [],
            selectedPage: page
          }, () => {
            this.updateState({
                selections: selections,
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
        console.log(this.state)
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

export default SelectionListPage;