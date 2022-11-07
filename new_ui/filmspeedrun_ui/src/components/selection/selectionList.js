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
        let selectionVs = []
        selections.forEach(selection => {
            console.log(selection)
            selectionVs.push(
                <div className="selectionCard">
                    <div className="selectionPosterItem">
                        <img src={selection.poster}
                             width="100%"></img>
                    </div>
                    <h3 className="selectionTitleItem">{selection.name}</h3>
                </div>
            )
        });
        this.setState({
            selectionViews: selectionVs
        })
    }
    render()
    {
        console.log("selectionsViews")
        
        return (
            <div>
                <h2 className="selectionTitle">{this.props.title}</h2>
                <div className="selectionBox">
                    {this.state.selectionViews.map((i) =>
                    {
                        console.log(i)
                        return i
                        })}
                </div>
            </div>
        )
    }
}

export default SelectionList;