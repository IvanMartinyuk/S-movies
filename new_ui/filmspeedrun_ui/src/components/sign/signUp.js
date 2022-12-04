import React from 'react'
import './signUp.scss'
import './signIn.scss'
import { UserService } from '../../services/userService'
import hash from '../../services/passwordService'
import { useNavigate } from "react-router-dom";


class SignUp extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            avatarUrl: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
        }
        this.updateState = this.updateState.bind(this);
    }
    render() {
        return(
            <div className='signBox'>
                <div className='avatarDiv'>
                    <img src={ this.state.avatarUrl } className="test"></img>
                </div>
                <h4 className='signText'>Avatar(write url)</h4>
                <input type='text' id='avatarUrl' onInput={() => this.updateState()}></input>
                <h4 className='signText'>Email</h4>
                <input type="text" id='email'></input>
                <div className='flex'>
                    <h4 className='signText'>Login</h4>
                    <div className='signText red' id='loginCheck'></div>
                </div>                    
                <input type="text" id='login' onInput={() => this.checkLogin()}></input>
                <h4 className='signText'>Password</h4>
                <input type='password' id='password'></input>
                <div className='flex'>
                    <h4 className='signText'>Confirm password</h4>
                    <div className='signText red' id='confirmPasswordCheck'></div>
                </div>
                <input type='password' id='confirmPassword' onInput={() => this.checkConfirmPassword()}></input>
                
                <div className='error unvisible' id='loginError'>invalid user data</div>
                <div className='signBtns'>
                    <button className='signBtn' onClick={() => this.registration()}>Sign up</button>
                </div>
            </div>
        )
    }
    registration() {
        let passwordCheck = document.getElementById('confirmPasswordCheck');
        let loginCheck = document.getElementById('loginCheck');
        if(passwordCheck.classList.contains('green') && loginCheck.classList.contains('green'))
        {
            let email = document.getElementById('email').value;
            let login = document.getElementById('login').value;
            let password = document.getElementById('password').value;
            let image = this.state.avatarUrl;
            let userService = new UserService();
            userService.registration({
                login: login,
                email: email,
                passwordHash: hash(password),
                image: image
                }).then(response =>
                    {
                        if(response.ok)
                        {
                            sessionStorage.setItem('isRegistered', true)
                            const { navigation } = this.props;
                            navigation('/signin')   
                        }
                    })
        }
    }
    updateState() {
        this.setState({
            avatarUrl: document.getElementById('avatarUrl').value
        })
    }
    checkLogin() {
        let userService = new UserService();
        let login = document.getElementById('login').value;
        userService.checkLogin(login)
        .then(response => {
            let isCorrect = response.ok;
            let loginCheck = document.getElementById('loginCheck');
            if(isCorrect && !loginCheck.classList.contains('green'))
                loginCheck.classList.add('green');
            else if(!isCorrect || login.length == 0)
                loginCheck.classList.remove('green');
        })
    }
    checkConfirmPassword() {
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let passwordCheck = document.getElementById('confirmPasswordCheck');
        if(password === confirmPassword)
        {
            if(!passwordCheck.classList.contains('green'))
                passwordCheck.classList.add('green');
        }
        else
            passwordCheck.classList.remove('green');
    }
}

export default function() {
    const navigation = useNavigate();  
    return <SignUp navigation={navigation} />;
}