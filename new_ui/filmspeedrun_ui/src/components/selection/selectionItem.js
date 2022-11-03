import React from "react";

class SelectionItem extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (
            <div>
                <div>
                    <img src={this.props.url}></img>
                </div>
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}

export default SelectionItem;