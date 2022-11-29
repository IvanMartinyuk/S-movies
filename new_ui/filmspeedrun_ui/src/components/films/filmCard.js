import React from "react"
import { Link } from "react-router-dom";
import './filmCard.scss'

class FilmCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Link to={"/films/" + this.props.id} className="filmCard">
                <div className="poster">
                    <img src={this.props.image} className="posterImg"></img>
                </div>
                <h3>{ this.props.title }</h3>
            </Link>
        )
    }
    onCardClick() {

    }
}

export default FilmCard;