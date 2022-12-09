import React from "react";
import { useState, useContext } from "react";
import Form from "./Form"
import { UserContext } from "../Context/UserProvider.js"
import axios from 'axios'

export const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const { setUserState } = useContext(UserContext)

    const handleSignup = (e) => {
        e.preventDefault();
        const request = {
            method: 'Post',
            url: 'http://localhost:9000/auth/signup',
            proxy: {
              host: "http://localhost",
              port: 9000,
            },
            data:{
                email:email,
                username:username,
                password:password,
                profimg:profilePic
            }
          };
        axios(request)
        .then((resp) => {
          setUserState(resp.data)
          localStorage.setItem('user', JSON.stringify(resp.data.account));
          localStorage.setItem('token', JSON.stringify(resp.data.token));
        })
    }

    return(
        <>
            <Form submit={handleSignup} username={username} password={password} email ={email} profilePic ={profilePic} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setProfilePic={setProfilePic}/>
            <h3>Already have an account?</h3>
            <button onClick={() => props.toggleForm('login')}>SIGNIN</button>
        </>
    )
}

export default Signup;