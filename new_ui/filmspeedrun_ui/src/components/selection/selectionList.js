import React from "react";
import { SelectionService } from "../../services/selectionService";

class SelectionList extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        let selectionViews = (new SelectionService).GetTop();
        console.log(selectionViews);
        this.props.selections.forEach(selection => {
            
        });
        return (
            <div>
                <h2 className="selectionTitle">{this.props.title}</h2>
                <div className="selectionBox">
                    {selectionViews}
                </div>
            </div>
        )
    }
}

export default SelectionList;