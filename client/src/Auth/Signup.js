import React from "react";
import { useState } from "react";
import Form from "./Form"

export const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    return(
        <>
            <Form submit={handleSubmit} username={username} password={password} email ={email} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail}/>
            <h3>Already have an account?</h3>
            <button onClick={() => props.toggleForm('login')}>SIGNIN</button>
        </>
    )
}

export default Signup;