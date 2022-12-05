import React from "react";
import './newSelection.scss'
import SelectionFilmCard from "./selectionFilmCard";

class NewSelection extends React.Component {
    render() {
        return (
            <div>
                <div className="mainInfoBox">
                    <div className="selPosterDiv">
                        <img src="https://m.media-amazon.com/images/M/MV5BMDI1NWM1ZDItNDFhMi00YWRhLTg1YzItNTNhY2M2N2QzY2FkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6762_AL_.jpg"
                             className="selPosterImg"></img>
                    </div>
                    <div>
                        <div className="descTitle">Description</div>
                        <div className="textAreaDiv">
                            <textarea className="selectionDescription"></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="descTitle">Films</h2>
                    <div className="selectionFilmBox">
                        <SelectionFilmCard></SelectionFilmCard>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewSelection;