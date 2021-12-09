// import { BrowserRouter as Route } from 'react-router-dom';
import React from "react";
import userService from "../../services/userService";
import filmService from "../../services/filmService";
import { Link } from "react-router-dom";
class Film extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.Title = "";
    this.Rating = 0.0;
    this.DateOfPublishing = "";
    this.Description = "";
    this.Image = "";
    this.Actors = [];
    this.Genres = [];
    this.Producers = [];
    this.Selections = [];
    this.Directors = [];
    this.CompanyId = 0;
    this.state = {
      id: 0,
      Title: "",
      Rating: 0.0,
      DateOfPublishing: "",
      Description: "",
      Image: "",
      Actors: [],
      Genres: [],
      Producers: [],
      Selections: [],
      Directors: [],
      CompanyId: 0,
    };
  }
  componentDidMount() {
    const id1 = this.props.match.params.id;
    this.id = id1;

    let us = new filmService();
    us.getFilm(id1).then((x) => {
      this.Title = x.title;
      this.Rating = x.rating;
      this.DateOfPublishing = x.dateOfPublishing;
      this.Description = x.description;
      this.Image = x.image;
      console.log(this.Rating);

      this.CompanyId = x.CompanyId;

      this.Actors = [];
      this.Genres = [];
      this.Producers = [];
      this.Selections = [];
      this.Directors = [];

      us.getActors(id1).then((xx) => {
        this.Actors = xx;
        us.getGenres(id1).then((xxx) => {
          this.Genres = xxx;
          console.log(xxx);
          us.getProducers(id1).then((xxxx) => {
            this.Producers = xxxx;

            us.getSelections(id1).then((xxxxc) => {
              this.Selections = xxxxc;

              us.getDirectors(id1).then((xxxxcc) => {
                this.Directors = xxxxcc;
                this.setState({
                  id: this.id,
                  Title: this.Title,
                  Rating: this.Rating,
                  DateOfPublishing: this.DateOfPublishing.substr(0, 10),
                  Description: this.Description,
                  Image: this.Image,
                  Actors: this.Actors,
                  Genres: this.Genres,
                  Producers: this.Producers,
                  Selections: this.Selections,
                  Directors: this.Directors,
                });
              });
            });
          });
        });
      });
    });
  }

  render() {
      console.log(this.state.Selections)
    return (
      <>
        <div
          style={{ marginTop: "100px" }}
          className="d-flex justify-content-center"
        >
          <div>
            {" "}
            <img
              src={this.state.Image}
              style={{
                position: "relative",
                background:
                  "url(" + this.state.Image + ") no-repeat center center   ",
                backgroundSize: "100% 100%",
                width: "20vw",
                height: "",
                borderRadius: "10px",
                boxShadow:
                  "0 0 20px rgba(255,255,255,.6),  inset 0 0 20px rgba(255,255,255,1)",
              }}
            />
            <div>
              <div
                className="d-flex justify-content-end"
                style={{ width: "20vw" }}
              >
                <div className="star" />
                <div
                  style={{
                    color: "white",
                    fontSize: "3vw",
                    width: "4vw",
                    textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                  }}
                >
                  {this.state.Rating}
                </div>
              </div>
              <div
                style={{
                  color: "rgb(212, 212, 212)",
                  fontSize: "2vw",
                  alignSelf: "end",
                  marginLeft: "10vw",
                }}
              >
                {this.state.DateOfPublishing}
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "3vw",
                  marginLeft: "10vw",
                  textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                }}
              >
                Genres:
              </div>
              {this.state.Genres.map((i) => {
                return (
                  <div className="d-flex justify-content-end">
                    <div
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                      }}
                      key={i.id}
                    >
                      {i.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginLeft: "3vw" }}>
            <div
              style={{
                color: "white",
                fontSize: "3vw",
                width: "40vw",
                textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
              }}
            >
              {this.state.Title}
            </div>

            <div
              style={{
                color: "white",
                marginTop: "3vw",
                fontSize: "1.5vw",
                width: "45vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              {this.state.Description}
            </div>
          </div>
        </div>
        <div
          style={{
            color: "white",
            marginTop: "50px",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Actors:
        </div>
        
        {this.state.Actors.map((i) => {
                return (
                    <div>
                    <Link
                       to={'/actors/'+i.id}
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                        marginLeft:"22vw"
                      }}
                      key={i.id}
                    >
                      {i.name}
                    </Link>
                    </div>
                );
              })}

        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Producers:
        </div>
        {this.state.Producers.map((i) => {
                return (
                    <div>
                    <Link
                    to={'/Producers/'+i.id}
                   style={{
                     color: "white",
                     fontSize: "2vw",
                     textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                     marginLeft:"22vw"
                   }}
                   key={i.id}
                 >
                   {i.name}
                 </Link>
                 </div>
                );
              })}
        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Directors:
        </div>
        {this.state.Directors.map((i) => {
                return (
                 <div>
                    <Link
                    to={'/Directors/'+i.id}
                   style={{
                     color: "white",
                     fontSize: "2vw",
                     textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                     marginLeft:"22vw"
                   }}
                   key={i.id}
                 >
                   {i.name}
                 </Link>
                 </div>
                );
              })}
        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Selections:
        </div>  {this.state.Selections.map((i) => {
                return (
                    <div>
                    <Link
                    to={'/Selections/'+i.id}
                   style={{
                     color: "white",
                     fontSize: "2vw",
                     textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                     marginLeft:"22vw"
                   }}
                   key={i.id}
                 >
                   {i.name}
                 </Link>
                 </div>
                );
              })  
              }
          {this.state.Selections.length==0 &&
       <div
       style={{
         color: "white",
         fontSize: "2vw",
         textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
         marginLeft:"22vw"
       }}
      
     >
       There are not.
     </div>
      }
      <div style={{marginTop:"100px"}}></div>
      </>
    );
  }
}
export default Film;
