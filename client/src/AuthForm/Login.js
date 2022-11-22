import { useState } from 'react';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username)
    }



    return(
        <>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="username123" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/><br></br>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="***********" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br></br>
                <button type="submit">LOGIN</button>
            </form>
            <h3>Don't have an account?</h3>
            <button>SIGNIN</button>
        </>
    )
}