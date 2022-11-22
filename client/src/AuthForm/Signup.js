import React from "react";
import { useState } from "react";
import Form from "./Form"

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    return(
        <>
            <Form submit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
            <h3>Already have an account?</h3>
            <button>SIGNIN</button>
        </>
    )
}