// import { BrowserRouter as Route } from 'react-router-dom';
import React from 'react';
import userService from '../../services/userService';
class Film extends React.Component {
  constructor(props){
    super(props)

    this.state={
      id:0,
        Title :'',
        Rating:0.0,
        DateOfPublishing :'',
        Description: '',
        Image :'',
        Actors :[],
        Genres: [],
        Producers:[],
       Selections :[],
        Directors:[] ,
        CompanyId :0
       
    }
  }
    componentDidMount() {
        const id1 = this.props.match.params.id;
 
        this.setState(()=>{
            return {id:id1}
        })
        let us =new userService;
        let g = us.getFilm(id1).then(x=> console.log(x));
       //uhuuuuuuuuuuuuuuu
    }

  

    render() {
        return <div>{this.state.id}</div>;
    }
    

}
export default Film;