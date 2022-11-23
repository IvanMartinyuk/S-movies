import React from "react";
import { SelectionService } from "../../services/selectionService";
import SelectionList from "./selection/selectionList"

class SelectionListPage extends React.Component
{
    render()
    {
        return(
            <SelectionList></SelectionList>
        )
    }
}

export default SelectionListPage;