import React from "react"
import { useState } from 'react';
import Form from "./Form"
import PropTypes from 'prop-types'
import axios from 'axios'

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {
            method: 'Post',
            url: 'http://localhost:9000/auth/login',
            proxy: {
              host: "http://localhost",
              port: 9000,
            },
            data:{
                email:email,
                username:username,
                password:password
            }
          };
        axios(request)
        .then((resp) => {
          console.log('response: ', resp);
          props.setToken(resp.data.token)
        })
    }

    return(
        <>
            <Form submit={handleSubmit} username={username} password={password} email={email} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail}/>
            <h3>Don't have an account?</h3>
            <button onClick={() => props.toggleForm('signup')}>SIGNUP</button>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;