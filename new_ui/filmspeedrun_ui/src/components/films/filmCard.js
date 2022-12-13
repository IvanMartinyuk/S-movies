import React from "react"
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { SelectionService } from "../../services/selectionService";
import './filmCard.scss'
import SelectionSearchCard from "./selectionSearchCard";

class FilmCard extends React.Component {
    selectionService = new SelectionService();
    constructor(props) {
        super(props);
        let shortDesc = props.film.description;
        shortDesc = shortDesc.substring(0, 120) + "..."
        this.state = {
            id: props.film.id,
            image: props.film.image,
            title: props.film.title,
            imdbRating: props.film.imdbRating,
            localRating: props.film.localRating,
            description: shortDesc,
            selections: []
        }
    }
    render() {
        return (
            <div className="relative">
                <Popup trigger={<button className="plusToSelection" 
                                        id={"plus" + this.state.id}>+</button>}
                position='right top'>
                    <div className="popup-menu">
                        <input type='text' 
                               id="selName"
                               autoComplete="off"
                               onInput={e => {
                                   if(!sessionStorage.getItem('username'))
                                       document.getElementById('searchSelError').classList.remove('unvisible');
                                    else
                                        this.getSelections(e.target.value)
                               }}></input>
                        <div className="filmSearchResult">
                            <div className="error unvisible" 
                                 id="searchSelError">
                                You have to login
                            </div>

                            {
                                this.state.selections.map(sel => { return sel })
                            }
                        </div>
                    </div>
                </Popup>
                <Link to={"/films/" + this.state.id} className="filmCard">
                    <div className="poster" 
                        onMouseEnter={() => {
                                document.getElementById("hover" + this.state.id).style.visibility = 'visible';
                                document.getElementById("plus" + this.state.id).style.visibility = 'visible';
                            }}>
                        <img src={this.state.image} className="posterImg"></img>
                    </div>
                    <div className="poster hover absolute" id={"hover" + this.state.id}
                        onMouseLeave={() => {
                                document.getElementById("hover" + this.state.id).style.visibility = 'hidden';
                                document.getElementById("plus" + this.state.id).style.visibility = 'hidden';
                            }}>
                        <div className="flex-center">
                            
                        </div>
                        <div className="middleCard">
                            <div className='ratingCard'>
                                <b className='ratingName'>Imdb</b>
                                <div className='flex'>
                                    <b className='rating'>{this.state.imdbRating}</b>
                                    <div className='starDiv'>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAErElEQVRogd2ZX2gcVRTGv9vEJjZp0lSrkLZSBG2JxQepRS1SNRFTHwzVGhC1aqp98s9jQSr4JEWfBH3wD1ZtIZKCUEXEaKsJVMQHqwXbVJGKxEYNmjRJ07TZ7s+HOctM1t2d2e2dbPDAMLv3nvt937lz595z70j/E3NpggOLJB02njudc9k0+VIzoIPQOqqtp2IDeiOB9FZbT0UGLAfOARm7ZoAr0uJblBawpEck1Uvql/S5pDpJD6fIl44BR21IPQBss9/Hqq2rLAM2mPBRoA5YDPxpZRvS4ExraO2w+3vOufPOuQuS9ufVLWwDLgfGrPfbIuXrgCwwDiyppsZEBmy3II4UqPva6rZXQ1tZBgyY2J4CdTusbqAa2hIbcL0Nn0lgaYH6RmDCglnnk9v3y96jIK/6wDk3mV/pnJuS1Gd/H/PM7ceAWuB36+1bSvjdaj5/AJfNp8ZEBnSZwBMJfH803/t88fscWrn14a0Evu/ktblkS7QfsXm/QdJSScskNdrVIKlFUrOklyRlJa1yzo3G4K2QNKygI5+XdEbSmKSzkqbsGpc0Kemsc246NhDgUUntJqxZUlNEZJOVJX1yB5xz3UkcgQOStiXEzSoIdkJhsBNWNiXpkAP+krQiBmimQONoz01Z+ZvOuZGEgbRKekpBRzVq7pPO79T6GLhRAZ2WNmBzfDewHlgDtAA1SYSlaUCNaVlj2roj69E40JlzvA44HslY76iy9qIG3AaMmNafo/lczqEJ+MgcZoGnq6S1qAFPAudN42dASzHHGmAPob2xEBYtW2zzddUmafgQMG2NBoGr5kFvMS3LgS9MywzwRLkANwG/GcAvwPqUtJbSsBYYMg2nKZH6xAG1At8Y0CSw1bPWUtz3RmbT74BrLhWwDthrgFkbq6mdvgAO2AVcNM5efO4ogZ02mwH0AQ3ewEOOemCfcWSAXb45ckRbCPfjR4HVHrFXEx4hjQFbfGEXI4y+gHs94r5rmEPA2nLblz3WnXMnFZwcStKv5bYvYafs3m8c6Rtwwnpvk0fMTYZ53BdmHGGrEU7gcdUnWL3PGPaqcttXMo3ebfcB59xsBe0LmnMuI2nQ/t5VbvtKAmm3+6EK2sZZDrO9pJcPA4bt8XtPWQj2GhCcxqT3WRBoM6KRJEQ2VX9qV+yBnK3qp42jLc6/YgOeNZJ9MX61lmacI7QLBOnN4pi2+83/Gb/q55IcNJKiqTSwEfjB/LLA23ZlrewYsLFE+8fN72BaQdQSZqP/SU0IPifsIciRIEj9OyL1t0fWn4sEm6PGAjgr05jeowS5o86hAnWbgZ+sfhZ4lQJJpQX7IuF29RRwTwG/k1Zf2f4jJpAXDPy1SNky69ncsPkeuDkB1o3At5H3pw+4MlL/upXvTiOQrwx8q/1/kPC74LT1dOKhYEP1OYING8DfwE6ru9/KvvQdxBKC/XIGuAH4MNKbg1SQrUawrwX6I3if2BPL2BD0t+8hOMTL9XzuYOwfoAcPCxfB+tFjmBhH7vCj00cMOaJXmGsfAyu9EYQ8VwPv53G97JPgsIEOA13egIvzdRGmQv5yOoLpdTfQ7A00nrPZODfPF+eCsH8B32vGCz3sjskAAAAASUVORK5CYII="/>
                                    </div>
                                </div>
                            </div>
                            <div className='ratingCard'>
                                <b className='ratingName'>Local</b>
                                <div className='flex'>
                                    <b className='rating'>{this.state.localRating}</b>
                                    <div className='starDiv'>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAErElEQVRogd2ZX2gcVRTGv9vEJjZp0lSrkLZSBG2JxQepRS1SNRFTHwzVGhC1aqp98s9jQSr4JEWfBH3wD1ZtIZKCUEXEaKsJVMQHqwXbVJGKxEYNmjRJ07TZ7s+HOctM1t2d2e2dbPDAMLv3nvt937lz595z70j/E3NpggOLJB02njudc9k0+VIzoIPQOqqtp2IDeiOB9FZbT0UGLAfOARm7ZoAr0uJblBawpEck1Uvql/S5pDpJD6fIl44BR21IPQBss9/Hqq2rLAM2mPBRoA5YDPxpZRvS4ExraO2w+3vOufPOuQuS9ufVLWwDLgfGrPfbIuXrgCwwDiyppsZEBmy3II4UqPva6rZXQ1tZBgyY2J4CdTusbqAa2hIbcL0Nn0lgaYH6RmDCglnnk9v3y96jIK/6wDk3mV/pnJuS1Gd/H/PM7ceAWuB36+1bSvjdaj5/AJfNp8ZEBnSZwBMJfH803/t88fscWrn14a0Evu/ktblkS7QfsXm/QdJSScskNdrVIKlFUrOklyRlJa1yzo3G4K2QNKygI5+XdEbSmKSzkqbsGpc0Kemsc246NhDgUUntJqxZUlNEZJOVJX1yB5xz3UkcgQOStiXEzSoIdkJhsBNWNiXpkAP+krQiBmimQONoz01Z+ZvOuZGEgbRKekpBRzVq7pPO79T6GLhRAZ2WNmBzfDewHlgDtAA1SYSlaUCNaVlj2roj69E40JlzvA44HslY76iy9qIG3AaMmNafo/lczqEJ+MgcZoGnq6S1qAFPAudN42dASzHHGmAPob2xEBYtW2zzddUmafgQMG2NBoGr5kFvMS3LgS9MywzwRLkANwG/GcAvwPqUtJbSsBYYMg2nKZH6xAG1At8Y0CSw1bPWUtz3RmbT74BrLhWwDthrgFkbq6mdvgAO2AVcNM5efO4ogZ02mwH0AQ3ewEOOemCfcWSAXb45ckRbCPfjR4HVHrFXEx4hjQFbfGEXI4y+gHs94r5rmEPA2nLblz3WnXMnFZwcStKv5bYvYafs3m8c6Rtwwnpvk0fMTYZ53BdmHGGrEU7gcdUnWL3PGPaqcttXMo3ebfcB59xsBe0LmnMuI2nQ/t5VbvtKAmm3+6EK2sZZDrO9pJcPA4bt8XtPWQj2GhCcxqT3WRBoM6KRJEQ2VX9qV+yBnK3qp42jLc6/YgOeNZJ9MX61lmacI7QLBOnN4pi2+83/Gb/q55IcNJKiqTSwEfjB/LLA23ZlrewYsLFE+8fN72BaQdQSZqP/SU0IPifsIciRIEj9OyL1t0fWn4sEm6PGAjgr05jeowS5o86hAnWbgZ+sfhZ4lQJJpQX7IuF29RRwTwG/k1Zf2f4jJpAXDPy1SNky69ncsPkeuDkB1o3At5H3pw+4MlL/upXvTiOQrwx8q/1/kPC74LT1dOKhYEP1OYING8DfwE6ru9/KvvQdxBKC/XIGuAH4MNKbg1SQrUawrwX6I3if2BPL2BD0t+8hOMTL9XzuYOwfoAcPCxfB+tFjmBhH7vCj00cMOaJXmGsfAyu9EYQ8VwPv53G97JPgsIEOA13egIvzdRGmQv5yOoLpdTfQ7A00nrPZODfPF+eCsH8B32vGCz3sjskAAAAASUVORK5CYII="/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filmCardDesc">
                            {this.state.description}
                        </div>
                    </div>
                    <h3>{ this.state.title }</h3>
                </Link>
            </div>
        )    
    }
    getSelections(title) {
        this.selectionService.search(title).then(data => {
            this.setState({
                selections: []
            }, () => {
                let selViews = [];
                data.forEach(sel => {
                    selViews.push(
                        <SelectionSearchCard id={sel.id}
                                             name={sel.name}
                                             filmId={this.state.id}></SelectionSearchCard>
                    )
                })
                this.setState({
                    selections: selViews
                })
            })
        })
    }
}

export default FilmCard;