import React from 'react'
import './selectionListPage.scss'

class SelectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            poster: props.poster
        }
    }
    render() {
        return (
            <div>
                <h3>{ this.state.name }</h3>
            </div>
        )
    }
}

export default SelectionCard;