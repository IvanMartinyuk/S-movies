import React from "react"

class FilmCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="filmCard">
                <div className="poster">
                    <img src={this.props.image} className="posterImg"></img>
                </div>
                <h3>{ this.props.title }</h3>
            </div>
        )
    }
}

export default FilmCard;