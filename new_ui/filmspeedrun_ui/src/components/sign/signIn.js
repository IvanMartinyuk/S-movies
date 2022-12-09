import React from 'react'
import { UserService } from '../../services/userService'
import './signIn.scss'
import { useNavigate } from "react-router-dom";
import hash from '../../services/passwordService';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return (
            <div className='signBox'>
                <div className='registered unvisible' id='registered'>Sign up successful</div>
                <h4 className='signText'>Login</h4>                    
                <input type="text" id='login'></input>
                <h4 className='signText'>Password</h4>
                <input type='password' id='password'></input>
                <div className='error unvisible' id='loginError'>invalid user data</div>
                <div className='signBtns'>
                    <button className='signBtn' onClick={() => this.login()}>Sign in</button>
                </div>
                <div className='centerText'>
                    <div>Don't have account?</div>
                    <a className="registerLink" href='signup'>fix this!</a>
                </div>
            </div>
        )
    }
    componentDidMount() {
        if(sessionStorage.getItem('isRegistered') == 'true')
            {
                document.getElementById('registered').classList.remove('unvisible');
                sessionStorage.removeItem('isRegistered')
            }
    }
    login() {
        let login = document.getElementById("login").value;        
        let passwordHash = document.getElementById("password").value;
        passwordHash = hash(passwordHash);
        let userService = new UserService();
        userService.token({
            login: login,
            passwordHash: passwordHash
        }).then(result => {
            if(!result) 
                document.getElementById('loginError').classList.remove('unvisible');
            else
            {
                sessionStorage.setItem('isLogin', true)
                const { navigation } = this.props;
                navigation('/films')
            }
        })
    }
}

export default function() {
    const navigation = useNavigate();  
    return <SignIn navigation={navigation} />;
}