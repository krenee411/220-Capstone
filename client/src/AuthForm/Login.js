import React from "react"
import { useState } from 'react';
import Form from "./Form"

export const Login = (props) => {
    
    console.log(props)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username)
    }

    return(
        <>
            <Form submit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
            <h3>Don't have an account?</h3>
            <button onClick={() => props.toggleForm('signup')}>SIGNUP</button>
        </>
    )
    
}

export default Login;