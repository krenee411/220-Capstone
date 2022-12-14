import React from "react";
import { useState, useContext } from "react";
import Form from "./Form"
import { UserContext } from "../Context/UserProvider.js"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');

    


    const { setUserState } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignup = (e) => {
      const data = {
        email:email,
        username:username,
        password:password
    }
    if(profilePic !== ''){
      data.profimg = profilePic
    }
        e.preventDefault();
        const request = {
            method: 'Post',
            url: 'http://localhost:9000/auth/signup',
            proxy: {
              host: "http://localhost",
              port: 9000,
            },
            data:data
          };
        axios(request)
        .then((resp) => {
          const user = localStorage.setItem('user', JSON.stringify(resp.data.account));
          const token = localStorage.setItem('token', JSON.stringify(resp.data.token));
          setUserState(prevState => ({
            ...prevState,
            user: user,
            token:token
          }))
          navigate('/profile')
        })
    }
    console.log(profilePic)
    return(
        <>
            <Form submit={handleSignup} username={username} password={password} email ={email} profilePic ={profilePic} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setProfilePic={setProfilePic}/>
            <h3 className="authNotify">Already have an account?</h3>
            <button onClick={() => props.toggleForm('login')}>SIGNIN</button>
        </>
    )
}

export default Signup;