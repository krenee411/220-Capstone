import { useState } from 'react';
import Form from "./Form"

export default function Login(){
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
            <button>SIGNUP</button>
        </>
    )
}