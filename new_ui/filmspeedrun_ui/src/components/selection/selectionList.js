import React from "react";
import { SelectionService } from "../../services/selectionService";
import './selectionList.css'

class SelectionList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectionViews: []
        }        
        this.updateState = this.updateState.bind(this)
    }
    componentDidMount()
    {
        (new SelectionService).GetTop().then(selections => {
            this.updateState(selections)
        })
    }
    updateState(selections)
    {
        this.setState({
            selectionViews: this.convertSelection(selections)
        })
    }
    convertSelection(selections)
    {
        let selectionVs = []
        selections.forEach(selection => {
            selectionVs.push(
                <div className="selectionCard">
                    <div className="selectionPosterItem">
                        <img className="posterImg" src={selection.poster}></img>
                    </div>
                    <div className="flex ">
                        <h3 className="selectionTitleItem">{selection.name}</h3>
                        <div className="flex cardRating">
                            <div>{selection.rating}</div>
                            <div className="ratingDiv">
                                <img className="ratingIcon" src="https://img.icons8.com/fluency/512/star.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return selectionVs;
    }
    
    render()
    {
        
        
        return (
            <div>
                <h2 className="selectionTitle">{this.props.title}</h2>
                <div className="selectionBox">
                    {this.state.selectionViews.map((i) =>
                    {
                        return i
                        })}
                </div>
            </div>
        )
    }
}

export default SelectionList;