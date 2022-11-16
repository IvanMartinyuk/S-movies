import React from "react";
import { SelectionService } from "../../services/selectionService";
import SelectionList from "../selection/selectionList"

class SelectionsPage extends React.Component
{
    render()
    {
        return(
            <div className="mainBox">
                <SelectionList></SelectionList>
            </div>
        )
    }
}

export default SelectionsPage;