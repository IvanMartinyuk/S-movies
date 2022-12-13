import React from 'react'
import { SelectionService } from '../../../services/selectionService';
import SelectionCard from './selectionCard';
import './selectionListPage.scss'

class SelectionListPage extends React.Component {
    selectionService = new SelectionService();
    constructor(props) {
        super(props);
        this.state = {
            selections: []
        }
    }
    render() {
        return (
            <div className='list'>
                {
                    this.state.selections.map(sel => {
                        return <SelectionCard name={sel.name}
                                              id={sel.id}></SelectionCard>
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        this.selectionService.GetTop().then(selections => {
            this.setState({
                selections: selections
            })
        })
    }
}

export default SelectionListPage;