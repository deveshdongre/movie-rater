import React, {useContext, useEffect, useState} from 'react';
import {API} from '../api-service';
import { TokenContext } from '../index';
import {useCookies} from 'react-cookie';

function Auth(){ 

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const [token,setToken] = useCookies(['mr-token']);

    const [isLoginView, SetIsLoginView] = useState(true);

    useEffect( () => {
       if(token['mr-token']) window.location.href = '/movies';
        console.log(token)
    },[token])

    const LoginClicked = () =>{
        API.loginUser({username,password})
        .then( resp => setToken('mr-token',resp.token))
        .catch( error => console.log(error))

    }
    const RegisterClicked = () => {
        API.registerUser({username,password})
        .then( resp => console.log(resp))
        .catch( error => console.log(error))

    }

    return (
        <div>
            { isLoginView ? <h1>Login</h1> : <h1>Register</h1> }
            <label htmlFor="username">username</label><br/>
            <input id="username" type="text" placeholder="username" value={username}
            onChange={evt => setUsername(evt.target.value)}/><br/>
            <label htmlFor="password">Password</label><br/>
            <input id="password" type="password" placeholder="password" value={password}
            onChange={evt => setPassword(evt.target.value)}></input><br/>
            { isLoginView ?
            <button onClick={LoginClicked}>Login</button>: 
            <button onClick={RegisterClicked}>Register</button> }
             
            { isLoginView ? 
            <p onClick={() => SetIsLoginView(false)}>You don't have an Account ? Register Here </p> : 
            <p onClick={() => SetIsLoginView(true)}>You already have an Account ? Login Here</p> }    

        </div>
    )
}

export default Auth;